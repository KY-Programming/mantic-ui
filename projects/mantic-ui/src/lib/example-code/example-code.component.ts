import { Component, ElementRef } from '@angular/core';
import { SegmentComponent } from '../segment/segment.component';
import { DimmableService } from '../services/dimmable.service';

@Component({
  selector: 'm-example-code',
  templateUrl: './example-code.component.html',
  styleUrls: ['./example-code.component.scss'],
  providers: [DimmableService]
})
export class ExampleCodeComponent extends SegmentComponent {

  public constructor(
    elementRef: ElementRef<HTMLElement>,
    dimmableService: DimmableService
  ) {
    super(elementRef, dimmableService);
  }
}
