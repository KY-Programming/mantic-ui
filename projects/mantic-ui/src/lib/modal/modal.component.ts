import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { ElementBase } from '../base/element-base';

export type ModalSize = 'mini' | 'tiny' | 'small' | 'large';

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
  public showHeader = true;

  @Input()
  public showFooter = true;

  @Input()
  public basic = false;

  @Input()
  public visible = true;

  @Input()
  public imageContent = false;

  @Input()
  public fullscreen = false;

  @Input()
  public size: ModalSize;

  @Input()
  public scrolling = true;

  @Input()
  public maxContentHeight: string;

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
      .registerBoolean('fullscreen', '')
      .registerBoolean('size', '')
      .registerBoolean('scrolling', '')
      .registerBoolean('imageContent', '');
  }

  public onClose(): void {
    this.close.emit();
  }

  public onDimmerClick(event: MouseEvent): void {
    // Only close modal if dimmer was clicked
    if ((event.target as HTMLElement).closest('.modal')) {
      return;
    }
    if (this.showClose || this.showClose === undefined) {
      this.onClose();
    }
  }
}
