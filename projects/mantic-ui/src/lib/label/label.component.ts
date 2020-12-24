import { Component, ElementRef, Input } from '@angular/core';
import { ColorName } from '../models/color';
import { LabelPosition } from './label-position';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'm-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent extends BaseComponent {

  @Input()
  public position: LabelPosition;

  @Input()
  public pointing: 'left' | 'right' | 'top' | 'bottom' | undefined;

  @Input()
  public basic: boolean;

  @Input()
  public color: ColorName;

  public constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList
      .register('pointing')
      .registerBoolean('pointing')
      .register('color')
      .registerBoolean('basic')
      .registerFixed('label', Number.MAX_VALUE - 1);
  }
}
