import { Component, Input } from '@angular/core';
import { ButtonBase } from '../base/button-base';

@Component({
  selector: 'm-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent extends ButtonBase {

  @Input()
  public icon: string;

  @Input()
  public social: string;

  public constructor() {
    super();
    this.classList
      .registerFixed('icon')
      .register('social');
  }
}
