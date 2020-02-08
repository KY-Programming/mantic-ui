import { Component, ElementRef, Input, Optional, SkipSelf } from '@angular/core';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'm-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends ElementBase {

  @Input()
  public position: 'top' | 'left' | 'bottom' | 'right' | undefined;

  @Input()
  public fixed = false;

  @Input()
  public secondary = false;

  @Input()
  public pointing = false;

  @Input()
  // public attached = false;
  public attached: 'top' | 'bottom';

  @Input()
  public tabular = false;

  @Input()
  public text = false;

  public constructor(
    readonly elementRef: ElementRef<HTMLElement>,
    @Optional() @SkipSelf() parentMenu?: MenuComponent
  ) {
    super(elementRef);
    this.ui = !parentMenu;
    this.classList
      .register('position')
      .registerBoolean('fixed')
      .registerBoolean('pointing')
      .registerBoolean('secondary')
      .registerAction('attached', (entry, value) => entry.classes = value ? value + ' attached' : '')
      .registerBoolean('tabular')
      .registerBoolean('text')
      .registerFixed('menu', Number.MAX_VALUE - 1);
  }
}
