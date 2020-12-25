import { Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { LabelPosition } from '../label/label-position';
import { BaseComponent } from '../base/base.component';

// TODO: Enable animation
// TODO: Enable active state
@Component({
  selector: 'm-label-dropdown',
  templateUrl: './label-dropdown.component.html',
  styleUrls: ['./label-dropdown.component.scss']
})
export class LabelDropdownComponent extends BaseComponent {

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

  @HostBinding('class.dropdown')
  @HostBinding('class.label')
  public readonly label = true;

  public constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
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
