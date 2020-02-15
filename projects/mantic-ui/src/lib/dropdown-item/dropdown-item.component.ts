import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { ElementBase } from '../base/element-base';
import { DropwDownSelectionService } from '../dropdown/dropdown-selection.service';
import { DropdownValue } from '../dropdown/dropdown-value';

@Component({
  selector: 'm-dropdown-item',
  templateUrl: './dropdown-item.component.html',
  styleUrls: ['./dropdown-item.component.scss']
})
export class DropdownItemComponent extends ElementBase {

  @Input()
  public value: unknown;

  @Input()
  public filtered = false;

  @Input()
  public selected = false;

  constructor(
    private readonly dropwDownSelectionService: DropwDownSelectionService,
    public readonly elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList
      .registerBoolean('filtered')
      .registerBoolean('selected', 'active selected')
      .registerFixed('item', Number.MAX_VALUE);
  }

  @HostListener('click', ['$event'])
  public click(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dropwDownSelectionService.select(this.value, this.elementRef);
  }

  public select(value = true): void {
    this.selected = value;
    this.refreshClasses();
  }

  public toValue(): DropdownValue {
    return new DropdownValue(this.value);
  }

}
