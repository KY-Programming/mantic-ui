import { ChangeDetectionStrategy, Component, computed, contentChildren, effect, ElementRef, inject, input, model, NgZone, OnInit, output, signal, untracked, viewChild, viewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { InvertibleComponent } from '../../base/invertible.component';
import { toBoolean } from '../../helpers/to-boolean';
import { transformableModel } from '../../helpers/transformable-model';
import { BooleanLike } from '../../models/boolean-like';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { IconComponent } from '../icon/icon.component';
import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';
import { DropDownSelectionService } from './dropdown-selection.service';
import { DropdownValue } from './dropdown-value';

@Component({
    selector: 'm-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    imports: [FormsModule, IconComponent, DropdownItemComponent],
    changeDetection: ChangeDetectionStrategy.Eager,
    providers: [...InvertibleComponent.providers, DropDownSelectionService],
    host: {
        '[class.multiple]': 'multiple()',
        '[class.attached-left]': 'attachedLeft()',
        '[class.attached-top]': 'attachedTop()',
        '[class.attached-right]': 'attachedRight()',
        '[class.attached-bottom]': 'attachedBottom()',
        '[attr.tabindex]': 'tabIndex()',
        '[class.search]': 'searchClass()',
        '[class.active]': 'isActive()',
        '[class.disabled]': 'readonly()',
        '[class.upward]': 'isUpwardClass()',
        '(focusin)': 'focus()',
        '(focusout)': 'blur()',
        '(click)': 'toggle()',
        '(keydown)': 'onKeyDown($event)'
    }
})
export class DropdownComponent extends InvertibleComponent implements OnInit {
    public static readonly defaults = {
        dropdownIcon: signal<IconType>('dropdown'),
        dropdownIconSize: signal<IconSize>(undefined),
        deleteIcon: signal<IconType>('delete'),
        deleteIconSize: signal<IconSize>(undefined),
        inverted: signal(false)
    };
    private static readonly upwardThreshold = 120;
    private static readonly viewportMargin = 8;
    private readonly dropDownSelectionService = inject(DropDownSelectionService);
    private readonly zone = inject(NgZone);
    protected readonly defaults = DropdownComponent.defaults;
    protected readonly textElement = viewChild<ElementRef<HTMLDivElement>>('htmlElement');
    protected readonly menuElement = viewChild<ElementRef<HTMLDivElement>>('menuElement');
    protected readonly inputElement = viewChild<ElementRef<HTMLInputElement>>('inputElement');
    private readonly contentItems = contentChildren(DropdownItemComponent);
    private readonly viewItems = viewChildren(DropdownItemComponent);
    protected readonly itemComponents = computed(() => [...this.contentItems(), ...this.viewItems()]);
    public readonly multiple = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly search = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly attachedLeft = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly attachedTop = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly attachedRight = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly attachedBottom = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly placeholder = input<string>();
    public readonly fluid = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly animationDuration = input(200);
    public readonly filter = model<string>();
    public readonly name = model<string>();
    public readonly filterValue = input(true);
    public readonly filterText = input(true);
    public readonly icon = input<IconType>();
    public readonly iconSize = input<IconSize>();
    public readonly dropdownIcon = input<IconType>();
    public readonly dropdownIconSize = input<IconSize>();
    public readonly deleteIcon = input<IconType>();
    public readonly deleteIconSize = input<IconSize>();
    public readonly filterType = input<'startsWith' | 'contains'>('startsWith');
    public readonly selectFirst = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly allowFreeText = input<boolean, BooleanLike>(false, { transform: toBoolean });
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly valueInput = input<unknown>(undefined, { alias: 'value' });
    private readonly valueState = signal<unknown>(undefined);
    public readonly value = this.valueState.asReadonly();
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly itemsInput = input<DropdownValue[] | null | undefined>(undefined, { alias: 'items' });
    private readonly itemsState = signal<DropdownValue[] | undefined>(undefined);
    public readonly items = this.itemsState.asReadonly();
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly disabledInput = input<boolean, BooleanLike>(false, { alias: 'disabled', transform: toBoolean });
    public readonly disabledChange = output<boolean>();
    public readonly disabled = transformableModel(this.disabledInput, this.disabledChange, toBoolean);
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly readonlyInput = input<boolean, BooleanLike>(false, { alias: 'readonly', transform: toBoolean });
    public readonly readonlyChange = output<boolean>();
    public readonly readonly = transformableModel(this.readonlyInput, this.readonlyChange, toBoolean);
    public readonly tabIndex = computed(() => this.search() ? undefined : 0);
    public readonly searchClass = computed(() => this.search() || this.allowFreeText());
    public readonly isActive = signal(false);
    public readonly isDefault = signal(true);
    public readonly isMenuVisible = signal(false);
    public readonly isHidden = signal(false);
    public readonly isSlidingIn = signal(false);
    public readonly isSlidingOut = signal(false);
    public readonly isFiltered = signal(false);
    public readonly isLoading = signal(false);
    public readonly selectedIndex = signal<number | undefined>(undefined);
    public readonly selectedItem = signal<DropdownValue | undefined>(undefined);
    public readonly selectedItems = signal<DropdownValue[]>([]);
    private readonly isSystemUpward = signal(false);
    private readonly menuMaxHeight = signal<number | undefined>(undefined);
    public readonly isUpwardClass = computed(() => this.isSystemUpward());
    public readonly menuMaxHeightPx = computed(() => this.menuMaxHeight());
    private readonly isFocused = signal(false);
    private readonly keepOpen = signal(false);
    public readonly hasItems = computed(() => this.itemComponents().length > 0);
    public readonly valueChange = output<unknown>();

    public constructor() {
        super();
        this.classes.register('fluid', 'disabled', 'multiple', 'search', 'active', 'visible', 'upward', 'selectFirst', 'placeholder', 'attachedLeft', 'attachedRight', 'attachedTop', 'attachedBottom', 'filterType', 'allowFreetext')
            .registerFixed('selection', 'dropdown');
        effect(() => this.classes.set('fluid', this.fluid()));
        effect(() => this.classes.set('disabled', this.disabled()));
        effect(() => this.refreshInverted(DropdownComponent.defaults.inverted()));
        this.dropDownSelectionService.selected.pipe(takeUntil(this.destroy)).subscribe(event => this.select(event));
        // External [value]/[items] changes drive the same selection logic the old setters did.
        // untracked() keeps select()'s many signal reads/writes from registering as effect dependencies.
        effect(() => {
            const value = this.valueInput();
            untracked(() => this.setValue(value));
        });
        effect(() => {
            const items = this.itemsInput();
            untracked(() => this.setItems(items));
        });
        effect(() => {
            const items = this.itemComponents();
            untracked(() => this.refreshItems(items));
        });
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        this.zone.runOutsideAngular(() =>
            fromEvent(window, 'scroll', { capture: true }).pipe(
                filter(event => this.isActive() && event.target instanceof HTMLElement && this.elementRef.nativeElement !== event.target && !this.elementRef.nativeElement.contains(event.target)),
                takeUntil(this.destroy)
            ).subscribe(() => this.zone.run(() => this.close())));
    }

    public focus(): void {
        // Ignore focus/blur of window
        if (this.isFocused()) {
            return;
        }
        this.open();
        setTimeout(() => this.isFocused.set(true), this.animationDuration());
    }

    public blur(): void {
        // Ignore focus/blur of window
        const inputElement = this.inputElement();
        if (document.activeElement === this.elementRef.nativeElement || inputElement && document.activeElement === inputElement.nativeElement || this.keepOpen()) {
            return;
        }
        this.isFocused.set(false);
        this.close();
    }

    public toggle(): void {
        if (this.isFocused() && this.isMenuVisible() && !this.search()) {
            this.close();
        }
        else {
            this.open();
        }
    }

    protected onKeyDown(event: KeyboardEvent): void {
        if (event.code === 'ArrowUp') {
            event.preventDefault();
            event.stopPropagation();
            const index = this.selectedIndex();
            this.selectIndex(index === undefined ? 0 : index - 1);
            this.open();
        }
        else if (event.code === 'ArrowDown') {
            event.preventDefault();
            event.stopPropagation();
            const index = this.selectedIndex();
            this.selectIndex(index === undefined ? 0 : index + 1);
            this.open();
        }
        else if (event.code === 'Enter' || event.code === 'Space') {
            const index = this.selectedIndex();
            if (index !== undefined && index >= 0) {
                event.preventDefault();
                event.stopPropagation();
                const component = this.itemComponents()[index];
                this.select(component.value());
                this.close();
            }
            else {
                const filteredComponents = this.itemComponents().filter(component => !component.filteredOut());
                if (filteredComponents.length === 1) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.select(filteredComponents[0].value());
                    this.close();
                }
            }
        }
        else if (event.code === 'Backspace') {
            const selectedItems = this.selectedItems();
            if (this.multiple() && selectedItems.length > 0) {
                event.preventDefault();
                event.stopPropagation();
                this.deselect(selectedItems[selectedItems.length - 1]);
            }
        }
        else if (event.code === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            this.filter.set(undefined);
            this.onFilter();
            this.close();
        }
        else if (event.code === 'Tab') {
            const index = this.selectedIndex();
            if (index !== undefined && index >= 0) {
                const component = this.itemComponents()[index];
                this.select(component.value());
            }
            else {
                const filteredComponents = this.itemComponents().filter(component => !component.filteredOut());
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
        if (this.isMenuVisible()) {
            return;
        }
        if (this.search()) {
            this.inputElement()?.nativeElement.focus();
        }
        this.isHidden.set(true);
        this.isLoading.set(true);
        this.isSystemUpward.set(false);
        this.menuMaxHeight.set(undefined);
        // Wait for rendering complete
        setTimeout(() => {
            const hostBounds = this.elementRef.nativeElement.getBoundingClientRect();
            const clip = this.getClippingBounds(this.elementRef.nativeElement);
            const spaceBelow = clip.bottom - hostBounds.bottom;
            const spaceAbove = hostBounds.top - clip.top;
            const isUpward = spaceBelow < DropdownComponent.upwardThreshold && spaceAbove > spaceBelow;
            this.isSystemUpward.set(isUpward);
            const available = (isUpward ? spaceAbove : spaceBelow) - DropdownComponent.viewportMargin;
            const menu = this.menuElement()?.nativeElement;
            const defaultMaxHeight = menu ? parseFloat(window.getComputedStyle(menu).maxHeight) : NaN;
            // Only override the stylesheet default when our viewport-fit cap is stricter.
            this.menuMaxHeight.set(isFinite(defaultMaxHeight) && defaultMaxHeight > 0 && defaultMaxHeight <= available
                ? undefined
                : Math.max(0, available));

            this.isLoading.set(false);
            this.isHidden.set(false);

            // Wait for rendering complete
            setTimeout(() => {
                this.isActive.set(true);
                this.isMenuVisible.set(true);
                this.isSlidingIn.set(true);
                this.isSlidingOut.set(false);
            });
        });
    }

    public close(): void {
        this.isSlidingIn.set(false);
        this.isSlidingOut.set(true);
        this.isActive.set(false);
        const filterValue = this.filter();
        if (this.allowFreeText() && (this.selectedIndex() === -1 || this.selectedIndex() === undefined) && filterValue) {
            this.setValue(filterValue);
            this.valueChange.emit(this.value());
        }
        this.filter.set(undefined);
        this.onFilter();
        this.keepOpen.set(false);
        setTimeout(() => {
            this.isMenuVisible.set(false);
            this.isSlidingOut.set(false);
        }, this.animationDuration());
    }

    // Mirrors the former `value` setter: dedupe against the current value, then run selection.
    private setValue(value: unknown): void {
        value ??= undefined;
        if (this.valueState() === value) {
            return;
        }
        this.valueState.set(value);
        this.select(value);
    }

    // Mirrors the former `items` setter.
    private setItems(value: DropdownValue[] | null | undefined): void {
        value ??= undefined;
        if (this.itemsState() === value) {
            return;
        }
        this.itemsState.set(value);
        this.select(this.value());
    }

    protected select(value: unknown): void {
        const isChanged = this.valueState() !== value;
        const components = this.itemComponents();
        if (this.items()?.length && !components.length) {
            return;
        }
        this.isDefault.set(false);
        if (!components.length) {
            this.selectedItem.set(undefined);
            this.selectedItems.set([]);
            this.setValue(value);
            this.filter.set(undefined);
            return;
        }
        let component = components.find(x => x.value() === value);
        if (this.selectFirst()) {
            component ??= components[0];
        }
        if (this.allowFreeText()) {
            this.setValue(component?.value() ?? value);
        }
        else if (this.search() && this.filter()) {
            this.filter.set(undefined);
            this.onFilter();
            this.setValue(component?.value());
        }
        else {
            this.setValue(component?.value());
        }
        if (isChanged) {
            this.valueChange.emit(this.value());
        }
        this.selectedIndex.set(component ? components.indexOf(component) : undefined);
        if (this.multiple() && component) {
            this.selectedItem.set(undefined);
            // TODO: Implement
            // this.selectedItems.push(item);
            // item.filtered = true;
        }
        else {
            const items = this.items();
            this.selectedItem.set(items ? items.find(item => item.value === value) : { value });
        }
        if (!this.multiple()) {
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
        const items = this.selectedItems();
        const index = items.indexOf(item);
        if (index >= 0) {
            this.selectedItems.set(items.filter((_, itemIndex) => itemIndex !== index));
        }
        if (this.selectedItems().length === 0) {
            this.isDefault.set(true);
        }
    }

    protected selectIndex(index: number): void {
        const components = this.itemComponents();
        this.selectedIndex.set(Math.max(0, Math.min(index, components.length - 1)));
        components.forEach((item, itemIndex) => item.select(itemIndex === this.selectedIndex()));
    }

    protected onFilter(): void {
        const components = this.itemComponents();
        components.forEach(item => item.filteredOut.set(this.isItemFilteredOut(item)));
        const filteredItems = components.filter(item => !item.filteredOut());
        if (filteredItems.length === 1) {
            this.selectedIndex.set(components.indexOf(filteredItems[0]));
        }
        else if (this.selectedIndex() !== undefined && !filteredItems.includes(components[this.selectedIndex()!])) {
            this.selectedIndex.set(components.indexOf(filteredItems[0]));
        }
        this.isFiltered.set(!!this.filter());
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

    private refreshItems(items: DropdownItemComponent[]): void {
        const selectedIndex = this.selectedIndex();
        if (selectedIndex === undefined || items[selectedIndex]?.value() !== this.value()) {
            setTimeout(() => this.select(this.value()));
        }
    }

    protected itemMouseDown(item: DropdownValue): void {
        this.keepOpen.set(true);
        // this.select(item);
        setTimeout(() => {
            if (this.search()) {
                this.inputElement()?.nativeElement.focus();
            }
            else {
                this.elementRef.nativeElement.focus();
            }
        });
    }

    protected itemMouseUp(item: DropdownValue): void {
        this.keepOpen.set(false);
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
