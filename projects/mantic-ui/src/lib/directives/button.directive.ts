import { Directive, ElementRef } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[m-button]'
})
export class ButtonDirective extends ButtonComponent {

  constructor(
    readonly elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
  }

}
