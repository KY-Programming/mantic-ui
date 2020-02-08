import { Component } from '@angular/core';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'm-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss']
})
export class ButtonGroupComponent extends ElementBase {

  public constructor() {
    super();
    this.classList
      .registerFixed('buttons', Number.MAX_VALUE - 1);
  }
}
