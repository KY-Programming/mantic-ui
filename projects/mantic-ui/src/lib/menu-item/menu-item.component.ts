import { Component, Input } from '@angular/core';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'm-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent extends ElementBase {

  @Input()
  public active = false;

  constructor() {
    super();
    this.classList
      .registerBoolean('active')
      .registerFixed('item', Number.MAX_VALUE - 1);
  }
}
