import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { DropwDownSelectionService } from '../dropdown/dropdown-selection.service';
import { DropdownValue } from '../dropdown/dropdown-value';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'm-dropdown-item',
  templateUrl: './dropdown-item.component.html',
  styleUrls: ['./dropdown-item.component.scss']
})
export class DropdownItemComponent extends BaseComponent {

  @Input()
  public value: unknown;

  @Input()
  public filtered = false;

  @Input()
  public selected = false;

  @Input()
  public icon: string;

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
    return new DropdownValue(this.value, undefined, this.icon);
  }

}
