import { Component, Input } from '@angular/core';
import { ElementBase } from '../base/element-base';
import { ColorName } from '../models/color';

@Component({
  selector: 'm-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent extends ElementBase {

  @Input()
  public position: 'left' | 'right' | undefined;

  @Input()
  public pointing: 'left' | 'right' | 'top' | 'bottom' | undefined;

  @Input()
  public basic: boolean;

  @Input()
  public color: ColorName;

  public constructor() {
    super();
    this.classList
      .register('pointing')
      .registerBoolean('pointing')
      .register('color')
      .registerBoolean('basic')
      .registerFixed('label', Number.MAX_VALUE - 1);
  }
}
