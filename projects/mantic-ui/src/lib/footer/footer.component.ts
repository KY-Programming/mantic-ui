import { Component } from '@angular/core';
import { SegmentComponent } from '../segment/segment.component';

@Component({
  selector: 'm-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends SegmentComponent {

  constructor() {
    super();
    this.classList
      .registerFixed('vertical')
      .registerFixed('footer', Number.MAX_VALUE - 2);

  }

}
