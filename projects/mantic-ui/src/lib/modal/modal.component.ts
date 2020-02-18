import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'm-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent extends ElementBase {

  @Input()
  public header: string;

  @Input()
  public showClose: boolean;

  @Input()
  public basic = false;

  @Input()
  public visible = true;

  @Input()
  public imageContent = false;

  @Output()
  public readonly close = new EventEmitter<void>();

  constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.ui = false;
    this.classList
      .registerBoolean('basic', '')
      .registerBoolean('visible', '')
      .registerBoolean('imageContent', '');
  }

  public onClose(): void {
    this.close.emit();
  }

  public onDimmerClick(): void {
    if (this.showClose || this.showClose === undefined) {
      this.onClose();
    }
  }
}
