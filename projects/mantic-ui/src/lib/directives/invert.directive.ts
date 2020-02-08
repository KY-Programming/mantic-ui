import { Directive, Optional } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { SegmentComponent } from '../segment/segment.component';

@Directive({
  selector: '[mInvert]'
})
export class InvertDirective {
  constructor(
    @Optional() button: ButtonComponent,
    @Optional() iconButton: IconButtonComponent,
    @Optional() segment: SegmentComponent
  ) {
    if (button) {
      button.inverted = true;
    }
    if (iconButton) {
      iconButton.inverted = true;
    }
    if (segment) {
      segment.inverted = true;
    }
  }
}
