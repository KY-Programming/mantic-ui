import { Component, ElementRef, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent {

  @Input()
  public size: 'huge' | 'large' | 'medium' | 'small' | 'tiny';

  constructor(elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
    this.classList
      .register('size')
      .registerFixed('header', Number.MAX_VALUE - 1);
  }
}
