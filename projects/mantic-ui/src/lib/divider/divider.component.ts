import { Component, ElementRef } from '@angular/core';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'm-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss']
})
export class DividerComponent extends ElementBase {

  public constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList
      .registerFixed('divider', Number.MAX_VALUE - 1);
  }
}
