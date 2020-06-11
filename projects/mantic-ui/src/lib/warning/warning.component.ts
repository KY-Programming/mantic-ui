import { Component, ElementRef, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'm-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss']
})
export class WarningComponent extends ElementBase {

  @Input()
  public showClose = true;

  @Input()
  @HostBinding('class.closed')
  public closed = false;

  @Output()
  public readonly close = new EventEmitter<void>();

  constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList
      .registerFixed('warning', Number.MAX_VALUE - 2)
      .registerFixed('message', Number.MAX_VALUE - 1);
  }

  public onClose(): void {
    this.closed = true;
    this.close.emit();
  }

}
