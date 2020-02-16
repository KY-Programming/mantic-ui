import { Directive, ElementRef, Input } from '@angular/core';
import { ElementBase } from '../base/element-base';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[m-header]'
})
export class HeaderDirective extends ElementBase {

  @Input()
  public dividing: boolean;

  constructor(
    readonly elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList
      .registerBoolean('dividing')
      .registerFixed('header', Number.MAX_VALUE - 1);
  }

}
