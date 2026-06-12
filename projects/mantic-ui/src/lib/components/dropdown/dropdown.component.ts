
import { Component, ContentChildren, ElementRef, EventEmitter, HostBinding, HostListener, Input, NgZone, OnInit, Output, QueryList, ViewChildren, ChangeDetectionStrategy, input, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { fromEvent, ReplaySubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { InvertibleComponent } from '../../base/invertible.component';
import { DisabledDirective } from '../../directives/disabled.directive';
import { FluidDirective } from '../../directives/fluid.directive';
import { BooleanLike } from '../../models/boolean-like';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { IconSize } from '../icon/icon-size';
import { IconType } from '../icon/icon-type';
import { IconComponent } from '../icon/icon.component';
import { DropDownSelectionService } from './dropdown-selection.service';
import { DropdownValue } from './dropdown-value';

@Component({
    selector: 'm-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    imports: [
    FormsModule,
    IconComponent,
    DropdownItemComponent
],
    hostDirectives: [FluidDirective.default, DisabledDirective.default],
    changeDetection: ChangeDetectionStrategy.Eager,
    providers: [...InvertibleComponent.providers, DropDownSelectionService]
})
export class DropdownComponent extends InvertibleComponent implements OnInit {
    public static readonly defaults = {
        dropdownIcon: <IconType>'dropdown',
        dropdownIconSize: <IconSize>undefined,
        deleteIcon: <IconType>'delete',
        deleteIconSize: <IconSize>undefined,
        inverted: false,
        invertedChange: new ReplaySubject<boolean>(1)
    };
    private isMultiple = false;
    private isSearch = false;
    private isSelectFirst = false;
    private isAttachedLeft = false;
    private isAttachedTop = false;
    private isAttachedRight = false;
    private isAttachedBottom = false;
    private isFreeTextAllowed = false;
    private isSystemUpward = false;
    private menuMaxHeight: number | undefined;
    private isDisabled = false;
    private isReadonly = false;
    protected readonly defaults = DropdownComponent.defaults;

    protected readonly textElement = viewChild<ElementRef<HTMLDivElement>>('htmlElement');

    protected readonly menuElement = viewChild<ElementRef<HTMLDivElement>>('menuElement');

    protected readonly inputElement = viewChild<ElementRef<HTMLInputElement>>('inputElement');

    @ContentChildren(DropdownItemComponent)
    protected set contentItemComponentsQuery(query: QueryList<DropdownItemComponent>) {
        if (query.length > 0) {
            this.refreshItems(query);
        }
        query.changes.subscribe(() => this.refreshItems(query));
    }

    @ViewChildren(DropdownItemComponent)
    protected set viewItemComponentsQuery(query: QueryList<DropdownItemComponent>) {
        if (query.length > 0) {
            this.refreshItems(query);
        }
        query.changes.subscribe(() => this.refreshItems(query));
    }

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    @HostBinding('class.multiple')
    public get multiple(): boolean {
        return this.isMultiple;
    }

    public set multiple(value: BooleanLike) {
        this.isMultiple = this.toBoolean(value);
    }

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    public get search(): boolean {
        return this.isSearch;
    }

    public set search(value: BooleanLike) {
        this.isSearch = this.toBoolean(value);
    }

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    @HostBinding('class.attached-left')
    public get attachedLeft(): boolean {
        return this.isAttachedLeft;
    }

    public set attachedLeft(value: BooleanLike) {
        this.isAttachedLeft = this.toBoolean(value);
    }

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    @HostBinding('class.attached-top')
    public get attachedTop(): boolean {
        return this.isAttachedTop;
    }

    public set attachedTop(value: BooleanLike) {
        this.isAttachedTop = this.toBoolean(value);
    }

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    @HostBinding('class.attached-right')
    public get attachedRight(): boolean {
        return this.isAttachedRight;
    }

    public set attachedRight(value: BooleanLike) {
        this.isAttachedRight = this.toBoolean(value);
    }

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    @HostBinding('class.attached-bottom')
    public get attachedBottom(): boolean {
        return this.isAttachedBottom;
    }

    public set attachedBottom(value: BooleanLike) {
        this.isAttachedBottom = this.toBoolean(value);
    }

    public readonly placeholder = input<string>();

    public get value(): unknown {
        return this.valueField;
    }

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    public set value(value: unknown) {
        value ??= undefined;
        if (this.valueField === value) {
            return;
        }
        this.valueField = value;
        this.select(value);
    }

    public readonly filter = input<string>();

    public readonly animationDuration = input(200);

    public get items(): DropdownValue[] | undefined {
        return this.itemsField;
    }

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    public set items(value: DropdownValue[] | null | undefined) {
        value ??= undefined;
        if (this.itemsField === value) {
            return;
        }
        this.itemsField = value;
        this.select(this.value);
    }

    public readonly name = input<string>();

    public readonly filterValue = input(true);

    public readonly filterText = input(true);

    public readonly icon = input<IconType>();

    public readonly iconSize = input<IconSize>();

    public readonly dropdownIcon = input<IconType>();

    public readonly dropdownIconSize = input<IconSize>();

    public readonly deleteIcon = input<IconType>();

    public readonly deleteIconSize = input<IconSize>();

    public readonly filterType = input<'startsWith' | 'contains'>('startsWith');

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    public get selectFirst(): boolean {
        return this.isSelectFirst;
    }

    public set selectFirst(value: BooleanLike) {
        this.isSelectFirst = this.toBoolean(value);
    }

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    public get allowFreeText(): boolean {
        return this.isFreeTextAllowed;
    }

    public set allowFreeText(value: BooleanLike) {
        this.isFreeTextAllowed = this.toBoolean(value);
    }

    @HostBinding('attr.tabindex')
    public get tabIndex(): number {
        return (this.search ? undefined : 0) as any;
    }

    @HostBinding('class.search')
    public get searchClass(): boolean {
        return this.isSearch || this.isFreeTextAllowed;
    }

    @HostBinding('class.active')
    public isActive = false;

    public set disabled(value: BooleanLike) {
        this.isDisabled = this.toBoolean(value);
    }

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    @HostBinding('class.disabled')
    public get readonly(): boolean {
        return this.isReadonly;
    }

    public set readonly(value: BooleanLike) {
        this.isReadonly = this.toBoolean(value);
    }

    @HostBinding('class.upward')
    public get isUpwardClass(): boolean {
        return this.isSystemUpward;
    }

    public get menuMaxHeightPx(): number | undefined {
        return this.menuMaxHeight;
    }

    private static readonly upwardThreshold = 120;
    private static readonly viewportMargin = 8;

    public isDefault = true;
    public isMenuVisible = false;
    public isHidden = false;
    public isSlidingIn = false;
    public isSlidingOut = false;
    public isFiltered = false;
    public isLoading = false;
    public selectedIndex: number | undefined;
    public selectedItem: DropdownValue | undefined;
    public selectedItems: DropdownValue[] = [];

    private isFocused = false;
    private keepOpen = false;
    private itemComponents: DropdownItemComponent[] = [];
    private valueField: unknown;
    private itemsField: DropdownValue[] | undefined;

    public get hasItems(): boolean {
        return !!this.itemComponents?.length;
    }

    @Output()
    public readonly valueChange = new EventEmitter();

    public constructor(
        private readonly dropDownSelectionService: DropDownSelectionService,
        private readonly zone: NgZone
    ) {
        super();
        this.classes.register('multiple', 'search', 'active', 'visible', 'upward', 'selectFirst', 'placeholder', 'attachedLeft', 'attachedRight', 'attachedTop', 'attachedBottom', 'filterType', 'allowFreetext')
            .registerFixed('selection', 'dropdown');
        this.dropDownSelectionService.selected.pipe(takeUntil(this.destroy)).subscribe(event => this.select(event));
        DropdownComponent.defaults.invertedChange.pipe(takeUntil(this.destroy)).subscribe(value => this.refreshInverted(value));
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        this.zone.runOutsideAngular(() =>
            fromEvent(window, 'scroll', { capture: true }).pipe(
                filter(event => this.isActive && event.target instanceof HTMLElement && this.elementRef.nativeElement !== event.target && !this.elementRef.nativeElement.contains(event.target)),
                takeUntil(this.destroy)
            ).subscribe(() => this.zone.run(() => this.close())));
    }

    @HostListener('focusin')
    public focus(): void {
        // Ignore focus/blur of window
        if (this.isFocused) {
            return;
        }
        this.open();
        setTimeout(() => this.isFocused = true, this.animationDuration());
    }

    @HostListener('focusout')
    public blur(): void {
        // Ignore focus/blur of window
        const inputElement = this.inputElement();
        if (document.activeElement === this.elementRef.nativeElement || inputElement && document.activeElement === inputElement.nativeElement || this.keepOpen) {
            return;
        }
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
    protected onKeyDown(event: KeyboardEvent): void {
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
            if (this.selectedIndex !== undefined && this.selectedIndex >= 0) {
                event.preventDefault();
                event.stopPropagation();
                const component = this.itemComponents[this.selectedIndex];
                this.select(component.value());
                this.close();
            }
            else {
                const filteredComponents = this.itemComponents.filter(component => !component.filteredOut);
                if (filteredComponents.length === 1) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.select(filteredComponents[0].value());
                    this.close();
                }
            }
        }
        else if (event.code === 'Backspace') {
            if (this.multiple && this.selectedItems.length > 0) {
                event.preventDefault();
                event.stopPropagation();
                this.deselect(this.selectedItems[this.selectedItems.length - 1]);
            }
        }
        else if (event.code === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            this.filter = undefined;
            this.onFilter();
            this.close();
        }
        else if (event.code === 'Tab') {
            if (this.selectedIndex !== undefined && this.selectedIndex >= 0) {
                const component = this.itemComponents[this.selectedIndex];
                this.select(component.value());
            }
            else {
                const filteredComponents = this.itemComponents.filter(component => !component.filteredOut);
                if (filteredComponents.length === 1) {
                    this.select(filteredComponents[0].value());
                }
            }
        }
    }

    protected deleteClick(item: DropdownValue, event: MouseEvent): void {
        event.preventDefault();
        this.deselect(item);
    }

    public open(): void {
        if (this.isMenuVisible) {
            return;
        }
        if (this.search) {
            this.inputElement()?.nativeElement.focus();
        }
        this.isHidden = true;
        this.isLoading = true;
        this.isSystemUpward = false;
        this.menuMaxHeight = undefined;
        // this.refreshClasses();
        // Wait for rendering complete
        setTimeout(() => {
            const hostBounds = this.elementRef.nativeElement.getBoundingClientRect();
            const clip = this.getClippingBounds(this.elementRef.nativeElement);
            const spaceBelow = clip.bottom - hostBounds.bottom;
            const spaceAbove = hostBounds.top - clip.top;
            this.isSystemUpward = spaceBelow < DropdownComponent.upwardThreshold && spaceAbove > spaceBelow;
            const available = (this.isSystemUpward ? spaceAbove : spaceBelow) - DropdownComponent.viewportMargin;
            const menu = this.menuElement()?.nativeElement;
            const defaultMaxHeight = menu ? parseFloat(window.getComputedStyle(menu).maxHeight) : NaN;
            // Only override the stylesheet default when our viewport-fit cap is stricter.
            this.menuMaxHeight = isFinite(defaultMaxHeight) && defaultMaxHeight > 0 && defaultMaxHeight <= available
                ? undefined
                : Math.max(0, available);

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
        const filterValue = this.filter();
        if (this.isFreeTextAllowed && (this.selectedIndex === -1 || this.selectedIndex === undefined) && filterValue) {
            this.value = filterValue;
            this.valueChange.emit(this.value);
        }
        this.filter = undefined;
        this.onFilter();
        this.keepOpen = false;
        setTimeout(() => {
            this.isMenuVisible = false;
            this.isSlidingOut = false;
            // this.refreshClasses();
        }, this.animationDuration());
        // this.refreshClasses();
    }

    protected select(value: unknown): void {
        const isChanged = this.valueField !== value;
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
        let component = this.itemComponents.find(x => x.value() === value);
        if (this.isSelectFirst) {
            component ??= this.itemComponents[0];
        }
        if (this.isFreeTextAllowed) {
            this.value = component?.value() ?? value;
        }
        else if (this.isSearch && this.filter()) {
            this.filter = undefined;
            this.onFilter();
            this.value = component?.value();
        }
        else {
            this.value = component?.value();
        }
        if (isChanged) {
            this.valueChange.emit(this.value);
        }
        this.selectedIndex = component ? this.itemComponents.indexOf(component) : undefined;
        if (this.multiple && component) {
            this.selectedItem = undefined;
            // TODO: Implement
            // this.selectedItems.push(item);
            // item.filtered = true;
        }
        else {
            this.selectedItem = this.items ? this.items.find(item => item.value === value) : { value };
        }
        if (!this.multiple) {
            this.close();
        }
        // HACK: This is a dirty hack, but currently i found no other solution. If you have a solution please create an issue
        setTimeout(() => {
            const textElement = this.textElement();
            if (!textElement) {
                return;
            }
            textElement.nativeElement.innerHTML = component?.element.nativeElement.innerHTML ?? '';
        });
        // HACK-END
    }

    protected deselect(item: DropdownValue): void {
        const index = this.selectedItems.indexOf(item);
        if (index >= 0) {
            this.selectedItems.splice(index, 1);
        }
        if (this.selectedItems.length === 0) {
            this.isDefault = true;
        }
    }

    protected selectIndex(index: number): void {
        this.selectedIndex = Math.max(0, Math.min(index, this.itemComponents.length - 1));
        this.itemComponents.forEach((item, itemIndex) => item.select(itemIndex === this.selectedIndex));
    }

    protected onFilter(): void {
        if (this.itemComponents) {
            this.itemComponents.forEach(item => item.filteredOut = this.isItemFilteredOut(item));
            // this.isFiltered = this.itemComponents.some(item => item.filtered);
        }
        else {
            // this.isFiltered = false;
        }
        const filteredItems = this.itemComponents.filter(item => !item.filteredOut);
        if (filteredItems.length === 1) {
            this.selectedIndex = this.itemComponents.indexOf(filteredItems[0]);
        }
        else if (this.selectedIndex !== undefined && !filteredItems.includes(this.itemComponents[this.selectedIndex])) {
            this.selectedIndex = this.itemComponents.indexOf(filteredItems[0]);
        }
        this.isFiltered = !!this.filter();
        // TODO: Filter content children
    }

    private isItemFilteredOut(item: DropdownItemComponent): boolean {
        const filterValue = this.filter();
        if (!filterValue) {
            return false;
        }
        const caseInsensitiveFilter = filterValue.toLowerCase();
        const filterAction: (value: string | undefined) => boolean = this.filterType() === 'contains'
            ? value => !!value && value.toLowerCase().indexOf(caseInsensitiveFilter) === -1
            : value => !!value && value.toLowerCase().indexOf(caseInsensitiveFilter) !== 0;
        const textContainsFilter = !this.filterText() || filterAction(item.element.nativeElement.innerText);
        const valueValue = item.value();
        const valueContainsFilter = !this.filterValue() || filterAction(valueValue && typeof valueValue.toString === 'function' ? valueValue.toString() : undefined);
        return textContainsFilter && valueContainsFilter;
    }

    private refreshItems(query: QueryList<DropdownItemComponent>): void {
        this.itemComponents = query.toArray();
        if (this.selectedIndex === undefined || this.itemComponents?.[this.selectedIndex]?.value() !== this.value) {
            setTimeout(() => this.select(this.value));
        }
    }

    protected itemMouseDown(item: DropdownValue): void {
        this.keepOpen = true;
        // this.select(item);
        setTimeout(() => {
            if (this.search) {
                this.inputElement()?.nativeElement.focus();
            }
            else {
                this.elementRef.nativeElement.focus();
            }
        });
    }

    protected itemMouseUp(item: DropdownValue): void {
        this.keepOpen = false;
    }

    /**
     * Intersects the viewport with every scrolling/clipping ancestor so the dropdown
     * fits inside the visible area even when an outer container clips it.
     */
    private getClippingBounds(element: HTMLElement): { top: number; bottom: number } {
        let top = 0;
        let bottom = window.innerHeight;
        let node: HTMLElement | null = element.parentElement;
        while (node && node !== document.body && node !== document.documentElement) {
            const style = window.getComputedStyle(node);
            const overflowY = style.overflowY;
            const clipsY = overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'hidden' || overflowY === 'clip';
            if (clipsY) {
                const rect = node.getBoundingClientRect();
                if (rect.top > top) {
                    top = rect.top;
                }
                if (rect.bottom < bottom) {
                    bottom = rect.bottom;
                }
            }
            node = node.parentElement;
        }
        return { top, bottom };
    }
}
