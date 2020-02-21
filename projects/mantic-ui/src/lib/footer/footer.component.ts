import { Component, ElementRef } from '@angular/core';
import { SegmentComponent } from '../segment/segment.component';
import { DimmableService } from '../services/dimmable.service';

@Component({
  selector: 'm-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [DimmableService]
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
