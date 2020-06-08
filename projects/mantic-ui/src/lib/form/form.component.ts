import { Component, ElementRef, Input } from '@angular/core';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'm-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent extends ElementBase {

  @Input()
  public action: string;

  @Input()
  public autocomplete: 'on' | 'off';

  @Input()
  public enctype: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';

  @Input()
  public method: 'get' | 'post';

  @Input()
  public name: string;

  @Input()
  public novalidate: boolean;

  @Input()
  public target: '_blank' | '_self' | '_parent' | '_top';

  public constructor(
    readonly elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.ui = false;
    // this.classList
    //   .registerFixed('form', Number.MAX_VALUE - 1);
  }

}
