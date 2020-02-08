import { Component } from '@angular/core';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'm-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss']
})
export class MenuHeaderComponent extends ElementBase {

  constructor() {
    super();
    this.classList
      .registerFixed('header')
      .registerFixed('item', Number.MAX_VALUE - 1);
  }

}
