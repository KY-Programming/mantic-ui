import { Component } from '@angular/core';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'm-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss']
})
export class DividerComponent extends ElementBase {

  public constructor() {
    super();
    this.classList
      .registerFixed('divider', Number.MAX_VALUE - 1);
  }
}
