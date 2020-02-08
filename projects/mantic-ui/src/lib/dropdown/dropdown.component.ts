import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'm-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent extends ElementBase {

  @ViewChild('text', { static: false })
  public textElement: ElementRef<HTMLDivElement>;

  @Input()
  public placeholder: string;

  @Input()
  public value: unknown;

  @Input()
  public animationDuration = 200;

  @Input()
  public isFluid: boolean;

  public showText = false;
  public isActive = false;
  public isVisible = false;
  public isSlidingDown = false;
  public isSlidingUp = false;

  @Output()
  public readonly valueChange = new EventEmitter<unknown>();

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>
  ) {
    super();
    this.classList
      .registerBoolean('isFluid', 'fluid')
      .registerFixed('selection')
      .registerBoolean('isActive', 'active')
      .registerBoolean('isVisible', 'visible')
      .registerFixed('dropdown', Number.MAX_VALUE);
  }

  @HostListener('click')
  public toggle(): void {
    if (this.isVisible) {
      this.close();
    }
    else {
      this.open();
    }
  }

  @HostListener('window:click', ['$event'])
  public onOutsideClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as HTMLElement)) {
      this.close();
    }
  }

  public open(): void {
    this.isActive = true;
    this.isVisible = true;
    this.isSlidingDown = true;
    this.isSlidingUp = false;
    this.refreshClasses();
  }

  public close(): void {
    this.isSlidingDown = false;
    this.isSlidingUp = true;
    setTimeout(() => {
      this.isActive = false;
      this.isVisible = false;
    }, this.animationDuration);
    this.refreshClasses();
  }

  public select(value: unknown, content: ElementRef<HTMLElement>): void {
    this.value = value;
    this.valueChange.emit(value);
    this.close();
    this.showText = true;
    // HACK: This is a dirty hack, but currently i found no other solution. If you have a solution please create an issue
    setTimeout(() => {
      this.textElement.nativeElement.innerHTML = content.nativeElement.innerHTML;
    });
    // HACK-END
  }
}
