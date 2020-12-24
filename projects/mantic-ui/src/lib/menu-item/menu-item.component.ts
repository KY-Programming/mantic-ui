import { Component, ElementRef, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'm-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent extends BaseComponent {

  @Input()
  public active = false;

  constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList
      .registerBoolean('active')
      .registerFixed('item', Number.MAX_VALUE - 1);
  }
}
