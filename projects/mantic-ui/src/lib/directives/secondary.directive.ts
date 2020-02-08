import { Directive, Optional } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Directive({
  selector: '[mSecondary]'
})
export class SecondaryDirective {
  constructor(
    @Optional() button: ButtonComponent,
    @Optional() iconButton: IconButtonComponent
  ) {
    if (button) {
      button.secondary = true;
    }
    if (iconButton) {
      iconButton.secondary = true;
    }
  }
}
