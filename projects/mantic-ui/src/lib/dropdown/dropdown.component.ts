import { Component, ContentChildren, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, QueryList, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ElementBase } from '../base/element-base';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { DropwDownSelectionService } from './dropdown-selection.service';
import { DropdownValue } from './dropdown-value';

@Component({
  selector: 'm-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [DropwDownSelectionService]
})
export class DropdownComponent extends ElementBase {

  @ViewChild('textElement', { static: false })
  public textElement: ElementRef<HTMLDivElement>;

  @ViewChild('menuElement', { static: false })
  public menuElement: ElementRef<HTMLDivElement>;

  @ViewChild('inputElement', { static: false })
  public inputElement: ElementRef<HTMLInputElement>;

  @ContentChildren(DropdownItemComponent)
  public set itemComponents(query: QueryList<DropdownItemComponent>) {
    if (query.length > 0) {
      this.refreshItems(query);
    }
    query.changes.subscribe(() => this.refreshItems(query));
  }

  @Input()
  public placeholder: string;

  @Input()
  public value: unknown;

  @Input()
  public filter: string;

  @Input()
  public animationDuration = 200;

  @Input()
  public isFluid: boolean;

  @Input()
  public items: DropdownValue[];

  @Input()
  public search: boolean;

  @Input()
  public filterValue = true;

  @Input()
  public filterText = true;

  @Input()
  public filterType: 'startsWith' | 'contains' = 'startsWith';

  @HostBinding('attr.tabindex')
  public get tabIndex(): number {
    return this.search ? undefined : 0;
  }

  public isDefault = true;
  public isActive = false;
  public isMenuVisible = false;
  public isHidden = false;
  public isSlidingIn = false;
  public isSlidingOut = false;
  public isFiltered = false;
  public isUpward = false;
  public isLoading = false;
  public selectedIndex: number;
  public useItemComponents = false;
  public selectedItem: DropdownValue;

  private isFocused = false;
  private itemElements: DropdownItemComponent[];

  @Output()
  public readonly valueChange = new EventEmitter<unknown>();

  constructor(
    private readonly dropwDownSelectionService: DropwDownSelectionService,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList
      .registerBoolean('search')
      .registerBoolean(['isFluid', 'fluid'], 'fluid')
      .registerFixed('selection')
      .registerBoolean(['isActive', 'active'], 'active')
      .registerBoolean(['isVisible', 'visible'], 'visible')
      .registerBoolean(['isUpward', 'upward'], 'upward')
      .registerFixed('dropdown', Number.MAX_VALUE);

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
    if (document.activeElement === this.elementRef.nativeElement || this.inputElement && document.activeElement === this.inputElement.nativeElement) {
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
  public keyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      event.stopPropagation();
      this.selectIndex(this.selectedIndex === undefined ? 0 : this.selectedIndex - 1);
      this.open();
    }
    else if (event.key === 'ArrowDown') {
      event.preventDefault();
      event.stopPropagation();
      this.selectIndex(this.selectedIndex === undefined ? 0 : this.selectedIndex + 1);
      this.open();
    }
    else if (event.key === 'Enter') {
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
    this.refreshClasses();
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
        this.refreshClasses();
      });
    });
  }

  public close(): void {
    this.isSlidingIn = false;
    this.isSlidingOut = true;
    this.isActive = false;
    this.isFiltered = false;
    this.filter = undefined;
    setTimeout(() => {
      this.isMenuVisible = false;
      this.isSlidingOut = false;
      this.refreshClasses();
    }, this.animationDuration);
    this.refreshClasses();
  }

  public select(item: DropdownValue): void {
    this.value = item.value;
    this.valueChange.emit(this.value);
    this.selectedItem = item;
    this.selectedIndex = this.items.indexOf(item);
    this.close();
    this.isDefault = false;
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

  public onFilter(event: KeyboardEvent): void {
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
    this.select(item);
    setTimeout(() => {
      if (this.search) {
        this.inputElement.nativeElement.focus();
      }
      else {
        this.elementRef.nativeElement.focus();
      }
    });
  }
}
