import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, ViewChild } from '@angular/core';
import { ElementBase } from '../base/element-base';
import { DropdownValue } from './dropdown-value';

@Component({
  selector: 'm-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent extends ElementBase {

  @ViewChild('text', { static: false })
  public textElement: ElementRef<HTMLDivElement>;

  @ViewChild('menu', { static: false })
  public menuElement: ElementRef<HTMLDivElement>;

  @ViewChild('input', { static: false })
  public inputElement: ElementRef<HTMLInputElement>;

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

  private lastElementTop: number;
  private isFocused = false;

  @Output()
  public readonly valueChange = new EventEmitter<unknown>();

  constructor(
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
    if (document.activeElement === this.elementRef.nativeElement) {
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

  public open(): void {
    if (this.search) {
      this.inputElement.nativeElement.focus();
    }
    this.isHidden = true;
    this.isLoading = true;
    // Wait for rendering complete
    setTimeout(() => {
      // Only recalculate if the elements top has changed
      const elementTop = this.elementRef.nativeElement.getBoundingClientRect().top;
      if (this.lastElementTop !== elementTop) {
        const bounds = this.menuElement.nativeElement.getBoundingClientRect();
        this.isUpward = bounds.bottom >= window.innerHeight;
        this.lastElementTop = elementTop;
      }

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

  public select(value: unknown, content: ElementRef<HTMLElement>): void {
    this.value = value;
    this.valueChange.emit(value);
    this.close();
    this.isDefault = false;
    // HACK: This is a dirty hack, but currently i found no other solution. If you have a solution please create an issue
    setTimeout(() => {
      this.textElement.nativeElement.innerHTML = content.nativeElement.innerHTML;
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
}
