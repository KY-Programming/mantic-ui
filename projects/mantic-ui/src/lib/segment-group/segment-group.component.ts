import { Component, ElementRef, Input } from '@angular/core';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'm-segment-group',
  templateUrl: './segment-group.component.html',
  styleUrls: ['./segment-group.component.scss']
})
export class SegmentGroupComponent extends ElementBase {

  @Input()
  public horizontal: boolean;

  constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList
      .registerBoolean('horizontal')
      .registerFixed('segments', Number.MAX_VALUE - 1);
  }

}
