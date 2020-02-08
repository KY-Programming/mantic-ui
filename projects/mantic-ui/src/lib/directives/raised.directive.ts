import { Directive, Optional } from '@angular/core';
import { SegmentComponent } from '../segment/segment.component';

@Directive({
  selector: '[mRaised]'
})
export class RaisedDirective {
  constructor(
    @Optional() segment: SegmentComponent
  ) {
    if (segment) {
      segment.raised = true;
    }
  }
}
