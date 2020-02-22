import { Directive, ElementRef } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Directive({
  selector: '[m-button]'
})
export class ButtonDirective extends ButtonComponent {

  constructor(
    readonly elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
  }

}
