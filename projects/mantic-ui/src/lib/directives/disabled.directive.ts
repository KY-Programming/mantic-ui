import { Directive, Optional } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Directive({
  selector: '[mDisabled]'
})
export class DisabledDirective {
  constructor(
    @Optional() button: ButtonComponent,
    @Optional() iconButton: IconButtonComponent
  ) {
    if (button) {
      button.disabled = true;
    }
    if (iconButton) {
      iconButton.disabled = true;
    }
  }
}
