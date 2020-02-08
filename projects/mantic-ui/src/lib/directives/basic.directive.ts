import { Directive, Optional } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Directive({
  selector: '[mBasic]'
})
export class BasicDirective {
  constructor(
    @Optional() button: ButtonComponent,
    @Optional() iconButton: IconButtonComponent
  ) {
    if (button) {
      button.basic = true;
    }
    if (iconButton) {
      iconButton.basic = true;
    }
  }
}
