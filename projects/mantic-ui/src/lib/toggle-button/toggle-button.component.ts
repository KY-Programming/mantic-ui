import { Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef } from '@angular/core';
import { Key } from '../models/key';
import { ButtonBaseComponent } from '../base/button-base.component';

@Component({
  selector: 'm-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent extends ButtonBaseComponent {

  @ContentChild('active')
  public activeTemplate: TemplateRef<HTMLElement>;

  @Input()
  public set checked(value: boolean | string) {
    this.active = value;
    // this.checkedChange.emit(value);
    // this.refreshClasses();
  }

  public get checked(): boolean | string {
    return this.active;
  }

  @Output()
  public readonly checkedChange = new EventEmitter<boolean>();

  public constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList
      .registerBoolean('checked')
      .registerFixed('toggle', Number.MAX_VALUE - 2);
  }

  @HostListener('click')
  public toggle(): void {
    this.checked = !this.checked;
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (event.code === Key.space || event.code === Key.enter) {
      this.checked = true;
      event.preventDefault();
    }
  }
}
