import { Component, ElementRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'm-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss']
})
export class MenuHeaderComponent extends BaseComponent {

  constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList
      .registerFixed('header')
      .registerFixed('item', Number.MAX_VALUE - 1);
  }

}
