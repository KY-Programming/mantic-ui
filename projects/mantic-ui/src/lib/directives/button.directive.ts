import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[m-button]'
})
// TODO: Implement
export class ButtonDirective /*extends ButtonComponent*/ {

  constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    // super(elementRef);
  }

}
