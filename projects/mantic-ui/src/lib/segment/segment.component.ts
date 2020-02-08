import { Component, Input } from '@angular/core';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'm-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss']
})
export class SegmentComponent extends ElementBase {

  public static readonly defaults = { raised: false };

  @Input()
  public inverted: boolean;

  @Input()
  public raised: boolean;

  public constructor() {
    super();
    this.raised = SegmentComponent.defaults.raised;
    this.classList
      .registerBoolean('inverted')
      .registerBoolean('raised')
      .registerFixed('segment', Number.MAX_VALUE - 1);
  }
}
