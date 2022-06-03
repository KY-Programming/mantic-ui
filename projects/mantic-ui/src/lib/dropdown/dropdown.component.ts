import { Component, ContentChildren, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { DropDownSelectionService } from './dropdown-selection.service';
import { DropdownValue } from './dropdown-value';
import { BaseComponent } from '../base/base.component';
import { BooleanLike } from '../models/boolean-like';

@Component({
    selector: 'm-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    providers: [DropDownSelectionService]
})
export class DropdownComponent extends BaseComponent {
    private isMultiple: boolean;
    private isSearch: boolean;
    private isFluid: boolean;
    private isSelectFirst: boolean;
    private isDisabled: boolean;
    private isAttachedLeft: boolean;
    private isAttachedTop: boolean;
    private isAttachedRight: boolean;
    private isAttachedBottom: boolean;
    private isFreeTextAllowed: boolean;

    @ViewChild('htmlElement')
    public textElement: ElementRef<HTMLDivElement>;

    @ViewChild('menuElement')
    public menuElement: ElementRef<HTMLDivElement>;

    @ViewChild('inputElement')
    public inputElement: ElementRef<HTMLInputElement>;

    @ContentChildren(DropdownItemComponent)
    public set contentItemComponentsQuery(query: QueryList<DropdownItemComponent>) {
        if (query.length > 0) {
            this.refreshItems(query);
        }
        query.changes.subscribe(() => this.refreshItems(query));
    }

    @ViewChildren(DropdownItemComponent)
    public set viewItemComponentsQuery(query: QueryList<DropdownItemComponent>) {
        if (query.length > 0) {
            this.refreshItems(query);
        }
        query.changes.subscribe(() => this.refreshItems(query));
    }

    @Input()
    @HostBinding('class.multiple')
    public get multiple(): boolean {
        return this.isMultiple;
    }

    public set multiple(value: BooleanLike) {
        this.isMultiple = this.toBoolean(value);
    }

    @Input()
    public get search(): boolean {
        return this.isSearch;
    }

    public set search(value: BooleanLike) {
        this.isSearch = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.fluid')
    public get fluid(): boolean {
        return this.isFluid;
    }

    public set fluid(value: BooleanLike) {
        this.isFluid = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.disabled')
    public get disabled(): boolean {
        return this.isDisabled;
    }

    public set disabled(value: BooleanLike) {
        this.isDisabled = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.attached-left')
    public get attachedLeft(): boolean {
        return this.isAttachedLeft;
    }

    public set attachedLeft(value: BooleanLike) {
        this.isAttachedLeft = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.attached-top')
    public get attachedTop(): boolean {
        return this.isAttachedTop;
    }

    public set attachedTop(value: BooleanLike) {
        this.isAttachedTop = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.attached-right')
    public get attachedRight(): boolean {
        return this.isAttachedRight;
    }

    public set attachedRight(value: BooleanLike) {
        this.isAttachedRight = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.attached-bottom')
    public get attachedBottom(): boolean {
        return this.isAttachedBottom;
    }

    public set attachedBottom(value: BooleanLike) {
        this.isAttachedBottom = this.toBoolean(value);
    }

    @Input()
    public placeholder: string;

    public get value(): unknown {
        return this.valueField;
    }

    @Input()
    public set value(value: unknown) {
        value ??= undefined;
        if (this.valueField === value) {
            return;
        }
        this.valueField = value;
        this.select(value);
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
        value ??= undefined;
        if (this.itemsField === value) {
            return;
        }
        this.itemsField = value;
        this.select(this.value);
    }

    @Input()
    public filterValue = true;

    @Input()
    public filterText = true;

    @Input()
    public icon: string;

    @Input()
    public filterType: 'startsWith' | 'contains' = 'startsWith';

    @Input()
    public get selectFirst(): boolean {
        return this.isSelectFirst;
    }

    public set selectFirst(value: BooleanLike) {
        this.isSelectFirst = this.toBoolean(value);
    }

    @Input()
    public get allowFreeText(): boolean {
        return this.isFreeTextAllowed;
    }

    public set allowFreeText(value: BooleanLike) {
        this.isFreeTextAllowed = this.toBoolean(value);
    }

    @HostBinding('attr.tabindex')
    public get tabIndex(): number {
        return this.search ? undefined : 0;
    }

    @HostBinding('class.search')
    public get searchClass(): boolean {
        return this.isSearch || this.isFreeTextAllowed;
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
    public selectedItem: DropdownValue;
    public selectedItems: DropdownValue[] = [];

    private isFocused = false;
    private keepOpen = false;
    private itemComponents: DropdownItemComponent[] = [];
    private valueField: unknown;
    private itemsField: DropdownValue[];

    public get hasItems(): boolean {
        return !!this.itemComponents?.length;
    }

    @Output()
    public readonly valueChange = new EventEmitter();

    @HostBinding('class.selection')
    @HostBinding('class.dropdown')
    public readonly dropdown = true;

    public constructor(
        private readonly dropDownSelectionService: DropDownSelectionService,
        private readonly elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList.register('disabled', 'multiple', 'search', 'fluid', 'active', 'visible', 'upward', 'selectFirst', 'placeholder', 'attachedLeft', 'attachedRight', 'attachedTop', 'attachedBottom', 'filterType', 'allowFreetext');
        this.dropDownSelectionService.selected.pipe(takeUntil(this.destroy)).subscribe(event => this.select(event));
    }

    @HostListener('focusin')
    public focus(): void {
        // Ignore focus/blur of window
        if (this.isFocused) {
            return;
        }
        this.open();
        setTimeout(() => this.isFocused = true, this.animationDuration);
    }

    @HostListener('focusout')
    public blur(): void {
        // Ignore focus/blur of window
        if (document.activeElement === this.elementRef.nativeElement || this.inputElement && document.activeElement === this.inputElement.nativeElement || this.keepOpen) {
            return;
        }
        this.isFocused = false;
        this.close();
    }

    @HostListener('click')
    public toggle(): void {
        if (this.isFocused && this.isMenuVisible && !this.search) {
            this.close();
        } else {
            this.open();
        }
    }

    @HostListener('keydown', ['$event'])
    public onKeyDown(event: KeyboardEvent): void {
        if (event.code === 'ArrowUp') {
            event.preventDefault();
            event.stopPropagation();
            this.selectIndex(this.selectedIndex === undefined ? 0 : this.selectedIndex - 1);
            this.open();
        } else if (event.code === 'ArrowDown') {
            event.preventDefault();
            event.stopPropagation();
            this.selectIndex(this.selectedIndex === undefined ? 0 : this.selectedIndex + 1);
            this.open();
        } else if (event.code === 'Enter' || event.code === 'Space') {
            if (this.selectedIndex >= 0) {
                event.preventDefault();
                event.stopPropagation();
                const component = this.itemComponents[this.selectedIndex];
                this.select(component.value);
                this.close();
            } else {
                const filteredComponents = this.itemComponents.filter(component => !component.filteredOut);
                if (filteredComponents.length === 1) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.select(filteredComponents[0].value);
                    this.close();
                }
            }
        } else if (event.code === 'Backspace') {
            if (this.multiple && this.selectedItems.length > 0) {
                event.preventDefault();
                event.stopPropagation();
                this.deselect(this.selectedItems[this.selectedItems.length - 1]);
            }
        } else if (event.code === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            this.filter = undefined;
            this.onFilter();
            this.close();
        } else if (event.code === 'Tab') {
            if (this.selectedIndex >= 0) {
                const component = this.itemComponents[this.selectedIndex];
                this.select(component.value);
            } else {
                const filteredComponents = this.itemComponents.filter(component => !component.filteredOut);
                if (filteredComponents.length === 1) {
                    this.select(filteredComponents[0].value);
                }
            }
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
        if (this.isFreeTextAllowed && this.selectedIndex === -1 && this.filter) {
            this.value = this.filter;
            this.valueChange.emit(this.value);
        }
        this.filter = undefined;
        this.onFilter();
        this.keepOpen = false;
        setTimeout(() => {
            this.isMenuVisible = false;
            this.isSlidingOut = false;
            // this.refreshClasses();
        }, this.animationDuration);
        // this.refreshClasses();
    }

    public select(value: unknown): void {
        if (this.items?.length && !this.itemComponents?.length) {
            return;
        }
        this.isDefault = false;
        if (!this.itemComponents?.length) {
            this.selectedItem = undefined;
            this.selectedItems.length = 0;
            this.value = value;
            this.filter = undefined;
            return;
        }
        let component = this.itemComponents.find(x => x.value === value);
        if (this.isSelectFirst) {
            component ??= this.itemComponents[0];
        }
        if (this.isFreeTextAllowed) {
            this.value = component?.value ?? value;
        } else if (this.isSearch && this.filter) {
            this.filter = undefined;
            this.onFilter();
            this.value = component?.value;
        } else {
            this.value = component?.value;
        }
        this.valueChange.emit(this.value);
        this.selectedIndex = this.itemComponents.indexOf(component);
        if (this.multiple && component) {
            this.selectedItem = undefined;
            // TODO: Implement
            // this.selectedItems.push(item);
            // item.filtered = true;
        } else {
            this.selectedItem = this.items ? this.items.find(item => item.value === value) : { value };
        }
        if (!this.multiple) {
            this.close();
        }
        // HACK: This is a dirty hack, but currently i found no other solution. If you have a solution please create an issue
        setTimeout(() => {
            this.textElement.nativeElement.innerHTML = component?.elementRef.nativeElement.innerHTML ?? '';
        });
        // HACK-END
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
        this.selectedIndex = Math.max(0, Math.min(index, this.itemComponents.length - 1));
        this.itemComponents.forEach((item, itemIndex) => item.select(itemIndex === this.selectedIndex));
    }

    public onFilter(): void {
        if (this.itemComponents) {
            this.itemComponents.forEach(item => item.filteredOut = this.isItemFilteredOut(item));
            // this.isFiltered = this.itemComponents.some(item => item.filtered);
        } else {
            // this.isFiltered = false;
        }
        const filteredItems = this.itemComponents.filter(item => !item.filteredOut);
        if (filteredItems.length === 1) {
            this.selectedIndex = this.itemComponents.indexOf(filteredItems[0]);
        } else if (!filteredItems.includes(this.itemComponents[this.selectedIndex])) {
            this.selectedIndex = this.itemComponents.indexOf(filteredItems[0]);
        }
        this.isFiltered = !!this.filter;
        // TODO: Filter content children
    }

    private isItemFilteredOut(item: DropdownItemComponent): boolean {
        if (!this.filter) {
            return false;
        }
        const caseInsensitiveFilter = this.filter.toLowerCase();
        const filterAction: (value: string) => boolean = this.filterType === 'contains'
            ? value => value && value.toLowerCase().indexOf(caseInsensitiveFilter) === -1
            : value => value && value.toLowerCase().indexOf(caseInsensitiveFilter) !== 0;
        const textContainsFilter = !this.filterText || filterAction(item.elementRef.nativeElement.innerText);
        const valueContainsFilter = !this.filterValue || filterAction(item.value && typeof item.value.toString === 'function' ? item.value.toString() : undefined);
        return textContainsFilter && valueContainsFilter;
    }

    private refreshItems(query: QueryList<DropdownItemComponent>): void {
        this.itemComponents = query.toArray();
        if (this.itemComponents?.[this.selectedIndex]?.value !== this.value) {
            setTimeout(() => this.select(this.value));
        }
    }

    public itemMouseDown(item: DropdownValue): void {
        this.keepOpen = true;
        // this.select(item);
        setTimeout(() => {
            if (this.search) {
                this.inputElement.nativeElement.focus();
            } else {
                this.elementRef.nativeElement.focus();
            }
        });
    }

    public itemMouseUp(item: DropdownValue): void {
        this.keepOpen = false;
    }
}
