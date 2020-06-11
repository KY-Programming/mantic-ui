import { Directive, ElementRef, Input } from '@angular/core';
import { ElementBase } from '../base/element-base';

@Directive({
  selector: '[m-header]'
})
export class HeaderDirective extends ElementBase {

  @Input()
  public dividing: boolean;

  @Input()
  public inverted: boolean;

  @Input()
  public icon: boolean;

  constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList
      .registerBoolean('inverted')
      .registerBoolean('icon')
      .registerBoolean('dividing')
      .registerFixed('header', Number.MAX_VALUE - 1);
  }

}
