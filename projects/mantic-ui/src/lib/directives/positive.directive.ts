import { Directive, Optional } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Directive({
  selector: '[mPositive]'
})
export class PositiveDirective {
  constructor(
    @Optional() button: ButtonComponent,
    @Optional() iconButton: IconButtonComponent
  ) {
    if (button) {
      button.positive = true;
    }
    if (iconButton) {
      iconButton.positive = true;
    }
  }
}
