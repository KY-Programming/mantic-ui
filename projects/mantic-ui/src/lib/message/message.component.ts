import { Component, ElementRef, Input } from '@angular/core';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'm-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent extends ElementBase {

  @Input()
  public header: string;

  @Input()
  public positive: boolean;

  @Input()
  public success: boolean;

  @Input()
  public warning: boolean;

  @Input()
  public error: boolean;

  @Input()
  public ignored: boolean;

  constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList
      .registerBoolean('ignored')
      .registerBoolean('positive')
      .registerBoolean('success')
      .registerBoolean('warning')
      .registerBoolean('error')
      .registerFixed('message', Number.MAX_VALUE - 1);
  }

}