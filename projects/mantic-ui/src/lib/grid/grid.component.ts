import { Component, ElementRef } from '@angular/core';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'm-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent extends ElementBase {

  constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList
      .registerFixed('grid');
  }

}
