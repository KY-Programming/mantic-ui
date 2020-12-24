import { Component, ElementRef, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'm-segment-group',
  templateUrl: './segment-group.component.html',
  styleUrls: ['./segment-group.component.scss']
})
export class SegmentGroupComponent extends BaseComponent {

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
