import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { ElementBase } from '../base/element-base';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'm-dropdown-item',
  templateUrl: './dropdown-item.component.html',
  styleUrls: ['./dropdown-item.component.scss']
})
export class DropdownItemComponent extends ElementBase {

  @Input()
  public value: unknown;

  constructor(
    private readonly dropdownComponent: DropdownComponent,
    public readonly elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList
      .registerFixed('item', Number.MAX_VALUE);
  }

  @HostListener('click', ['$event'])
  public click(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dropdownComponent.select(this.value, this.elementRef);
  }

}
