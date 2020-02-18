import { Component, ElementRef, Input } from '@angular/core';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends ElementBase {

  @Input()
  public size: 'huge' | 'large' | 'medium' | 'small' | 'tiny';

  constructor(elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
    this.classList
      .register('size')
      .registerFixed('header', Number.MAX_VALUE - 1);
  }
}
