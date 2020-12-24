import { Component, ElementRef, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'm-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent extends BaseComponent {

  @Input()
  public ignored: boolean;

  constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList
      .registerBoolean('ignored')
      .registerFixed('error', Number.MAX_VALUE - 2)
      .registerFixed('message', Number.MAX_VALUE - 1);
  }

}
