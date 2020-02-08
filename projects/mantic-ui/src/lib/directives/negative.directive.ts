import { Directive, Optional } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Directive({
  selector: '[mNegative]'
})
export class NegativeDirective {
  constructor(
    @Optional() button: ButtonComponent,
    @Optional() iconButton: IconButtonComponent
  ) {
    if (button) {
      button.negative = true;
    }
    if (iconButton) {
      iconButton.negative = true;
    }
  }
}
