import { Component, Input } from '@angular/core';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'm-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends ElementBase {

  @Input()
  public position: 'top' | 'left' | 'bottom' | 'right' = 'top';

  @Input()
  public fixed = true;

  @Input()
  public secondary = false;

  @Input()
  public pointing = false;

  public constructor() {
    super();
    this.classList
      .register('position')
      .registerBoolean('fixed')
      .registerBoolean('pointing')
      .registerBoolean('secondary')
      .registerFixed('menu', Number.MAX_VALUE - 1);
  }
}
