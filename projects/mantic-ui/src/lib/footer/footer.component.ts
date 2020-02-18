import { Component, ElementRef } from '@angular/core';
import { DimmableService } from '../base/dimmable.component';
import { SegmentComponent } from '../segment/segment.component';

@Component({
  selector: 'm-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends SegmentComponent {

  constructor(
    elementRef: ElementRef<HTMLElement>,
    dimmableService: DimmableService
  ) {
    super(elementRef, dimmableService);
    this.classList
      .registerFixed('vertical')
      .registerFixed('footer', Number.MAX_VALUE - 2);

  }

}
