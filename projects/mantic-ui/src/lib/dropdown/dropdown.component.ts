import { Component, ContentChildren, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, QueryList, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { DropwDownSelectionService } from './dropdown-selection.service';
import { DropdownValue } from './dropdown-value';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'm-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    providers: [DropwDownSelectionService]
})
export class DropdownComponent extends BaseComponent {
    private isMultiple: boolean;
    private isSearch: boolean;
    private isFluid: boolean;

    @ViewChild('textElement')
    public textElement: ElementRef<HTMLDivElement>;

    @ViewChild('menuElement')
    public menuElement: ElementRef<HTMLDivElement>;

    @ViewChild('inputElement')
    public inputElement: ElementRef<HTMLInputElement>;

    @ContentChildren(DropdownItemComponent)
    public set itemComponents(query: QueryList<DropdownItemComponent>) {
        if (query.length > 0) {
            this.refreshItems(query);
        }
        query.changes.subscribe(() => this.refreshItems(query));
    }

    @Input()
    @HostBinding('class.multiple')
    public get multiple(): boolean | string {
        return this.isMultiple;
    }

    public set multiple(value: string | boolean) {
        this.isMultiple = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.search')
    public get search(): boolean | string {
        return this.isSearch;
    }

    public set search(value: string | boolean) {
        this.isSearch = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.fluid')
    public get fluid(): boolean | string {
        return this.isFluid;
    }

    public set fluid(value: string | boolean) {
        this.isFluid = this.toBoolean(value);
    }

    @Input()
    public placeholder: string;

    public get value(): unknown {
        return this.valueField;
    }

    @Input()
    public set value(value: unknown) {
        if (this.valueField === value) {
            return;
        }
        this.valueField = value;
        if (this.items) {
            this.select(this.items.find(item => item.value === value));
        }
    }

    @Input()
    public filter: string;

    @Input()
    public animationDuration = 200;

    public get items(): DropdownValue[] {
        return this.itemsField;
    }

    @Input()
    public set items(value: DropdownValue[]) {
        if (this.itemsField === value) {
            return;
        }
        this.itemsField = value;
        this.select(value ? value.find(item => item.value === this.value) : undefined);
    }

    @Input()
    public filterValue = true;

    @Input()
    public filterText = true;

    @Input()
    public icon: string;

    @Input()
    public filterType: 'startsWith' | 'contains' = 'startsWith';

    @HostBinding('attr.tabindex')
    public get tabIndex(): number {
        return this.search ? undefined : 0;
    }

    @HostBinding('class.active')
    public isActive = false;

    @HostBinding('class.upward')
    public isUpward = false;

    public isDefault = true;
    public isMenuVisible = false;
    public isHidden = false;
    public isSlidingIn = false;
    public isSlidingOut = false;
    public isFiltered = false;
    public isLoading = false;
    public selectedIndex: number;
    public useItemComponents = false;
    public selectedItem: DropdownValue;
    public selectedItems: DropdownValue[] = [];

    private isFocused = false;
    private keepOpen = false;
    private itemElements: DropdownItemComponent[] = [];
    private valueField: unknown;
    private itemsField: DropdownValue[];

    @Output()
    public readonly valueChange = new EventEmitter<unknown>();

    @HostBinding('class.selection')
    @HostBinding('class.dropdown')
    public readonly dropdown = true;

    constructor(
        private readonly dropwDownSelectionService: DropwDownSelectionService,
        private readonly elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList
            .registerBoolean('multiple')
            .registerBoolean('search')
            .registerBoolean(['isFluid', 'fluid'], 'fluid')
            .registerBoolean(['isActive', 'active'], 'active')
            .registerBoolean(['isVisible', 'visible'], 'visible')
            .registerBoolean(['isUpward', 'upward'], 'upward');

        this.dropwDownSelectionService.selected.pipe(takeUntil(this.destroy)).subscribe(event => this.selectComponent(event.value, event.component));
    }

    @HostListener('focus')
    public focus(): void {
        // Ignore focus/blur of window
        if (this.isFocused) {
            return;
        }
        this.open();
        setTimeout(() => this.isFocused = true, this.animationDuration);
    }

    @HostListener('blur')
    public blur(): void {
        // Ignore focus/blur of window
        if (document.activeElement === this.elementRef.nativeElement || this.inputElement && document.activeElement === this.inputElement.nativeElement || this.keepOpen) {
            return;
        }
        console.log('blur', document.activeElement);
        this.isFocused = false;
        this.close();
    }

    @HostListener('click')
    public toggle(): void {
        if (this.isFocused && this.isMenuVisible && !this.search) {
            this.close();
        }
        else {
            this.open();
        }
    }

    @HostListener('keydown', ['$event'])
    public keyDown(event: KeyboardEvent): void {
        if (event.code === 'ArrowUp') {
            event.preventDefault();
            event.stopPropagation();
            this.selectIndex(this.selectedIndex === undefined ? 0 : this.selectedIndex - 1);
            this.open();
        }
        else if (event.code === 'ArrowDown') {
            event.preventDefault();
            event.stopPropagation();
            this.selectIndex(this.selectedIndex === undefined ? 0 : this.selectedIndex + 1);
            this.open();
        }
        else if (event.code === 'Enter' || event.code === 'Space') {
            event.preventDefault();
            event.stopPropagation();
            if (this.selectedIndex >= 0) {
                if (this.useItemComponents) {
                    const component = this.itemElements[this.selectedIndex];
                    this.selectComponent(component.value, component.elementRef);
                }
                else {
                    this.select(this.items[this.selectedIndex]);
                }
                this.close();
            }
        }
        else if (event.code === 'Backspace') {
            event.preventDefault();
            event.stopPropagation();
            if (this.multiple && this.selectedItems.length > 0) {
                this.deselect(this.selectedItems[this.selectedItems.length - 1]);
            }
        }
        else if (event.code === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            this.items.forEach(item => item.filtered = false);
            this.itemElements.forEach(component => component.filtered = false);
            this.close();
        }
    }

    public deleteClick(item: DropdownValue, event: MouseEvent): void {
        event.preventDefault();
        this.deselect(item);
    }

    public open(): void {
        if (this.isMenuVisible) {
            return;
        }
        if (this.search) {
            this.inputElement.nativeElement.focus();
        }
        this.isHidden = true;
        this.isLoading = true;
        this.isUpward = false;
        // this.refreshClasses();
        // Wait for rendering complete
        setTimeout(() => {
            const bounds = this.menuElement.nativeElement.getBoundingClientRect();
            this.isUpward = bounds.bottom >= window.innerHeight;

            this.isLoading = false;
            this.isHidden = false;

            // Wait for rendering complete
            setTimeout(() => {
                this.isActive = true;
                this.isMenuVisible = true;
                this.isSlidingIn = true;
                this.isSlidingOut = false;
                // this.refreshClasses();
            });
        });
    }

    public close(): void {
        this.isSlidingIn = false;
        this.isSlidingOut = true;
        this.isActive = false;
        this.isFiltered = false;
        this.filter = undefined;
        this.keepOpen = false;
        setTimeout(() => {
            this.isMenuVisible = false;
            this.isSlidingOut = false;
            // this.refreshClasses();
        }, this.animationDuration);
        // this.refreshClasses();
    }

    public select(item: DropdownValue): void {
        this.value = item ? item.value : undefined;
        this.valueChange.emit(this.value);
        this.selectedIndex = this.items && item ? this.items.indexOf(item) : -1;
        if (this.multiple && item) {
            this.selectedItem = undefined;
            this.selectedItems.push(item);
            item.filtered = true;
        }
        else {
            this.selectedItem = item;
        }
        if (!this.multiple) {
            this.close();
        }
        this.isDefault = false;
    }

    public deselect(item: DropdownValue): void {
        const index = this.selectedItems.indexOf(item);
        if (index >= 0) {
            this.selectedItems.splice(index, 1);
        }
        if (this.selectedItems.length === 0) {
            this.isDefault = true;
        }
    }

    public selectIndex(index: number): void {
        this.selectedIndex = Math.max(0, Math.min(index, this.items.length - 1));
        if (this.useItemComponents) {
            this.itemElements.forEach((item, itemIndex) => item.select(itemIndex === this.selectedIndex));
        }
    }

    private selectComponent(value: unknown, component: ElementRef): void {
        const item = this.items.find(x => x.value === value);
        this.select(item);
        // HACK: This is a dirty hack, but currently i found no other solution. If you have a solution please create an issue
        setTimeout(() => {
            this.textElement.nativeElement.innerHTML = component.nativeElement.innerHTML;
        });
        // HACK-END
    }

    public onFilter(event: Event): void {
        this.isFiltered = true;
        if (this.items) {
            this.items.forEach(item => item.filtered = this.isItemFiltered(item));
        }
        // TODO: Filter content children
    }

    private isItemFiltered(item: DropdownValue): boolean {
        const caseInsensitiveFilter = this.filter.toLowerCase();
        const filterAction: (value: string) => boolean = this.filterType === 'contains'
            ? value => value && value.toLowerCase().indexOf(caseInsensitiveFilter) === -1
            : value => value && value.toLowerCase().indexOf(caseInsensitiveFilter) !== 0;
        const textContainsFilter = !this.filterText || filterAction(item.text);
        const valueContainsFilter = !this.filterValue || filterAction(item.value && typeof item.value.toString === 'function' ? item.value.toString() : undefined);
        return textContainsFilter && valueContainsFilter;
    }

    public onKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    private refreshItems(query: QueryList<DropdownItemComponent>): void {
        this.itemElements = query.toArray();
        if (this.useItemComponents || this.itemElements.length > 0) {
            this.useItemComponents = true;
            this.items = this.itemElements.map(item => item.toValue());
        }
    }

    public itemMouseDown(item: DropdownValue): void {
        console.log('mouse down');
        this.keepOpen = true;
        // this.select(item);
        setTimeout(() => {
            if (this.search) {
                this.inputElement.nativeElement.focus();
            }
            else {
                this.elementRef.nativeElement.focus();
            }
        });
    }

    public itemMouseUp(item: DropdownValue): void {
        console.log('mouse up');
        this.keepOpen = false;
    }
}
