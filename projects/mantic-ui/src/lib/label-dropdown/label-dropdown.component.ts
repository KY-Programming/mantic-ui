import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { ElementBase } from '../base/element-base';
import { LabelPosition } from '../label/label-position';

// TODO: Enable animation
// TODO: Enable active state
@Component({
  selector: 'm-label-dropdown',
  templateUrl: './label-dropdown.component.html',
  styleUrls: ['./label-dropdown.component.scss']
})
export class LabelDropdownComponent extends ElementBase {

  public isOpen = false;

  @Input()
  public position: LabelPosition;

  @Input()
  public icon = 'dropdown';

  @Input()
  public value: string;

  @Input()
  public items: string[];

  private readonly onOutsideClickHandler = () => this.close();

  public constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList
      .registerFixed('dropdown', Number.MAX_VALUE - 2)
      .registerFixed('label', Number.MAX_VALUE - 1);
  }

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    // TODO: Replace prevent
    event.preventDefault();
    event.stopPropagation();
    if (this.isOpen) {
      this.close();
    }
    else {
      this.isOpen = true;
      window.addEventListener('click', this.onOutsideClickHandler);
    }
  }

  private close(): void {
    window.removeEventListener('click', this.onOutsideClickHandler);
    this.isOpen = false;
  }

  public select(value: string): void {
    this.value = value;
  }
}
