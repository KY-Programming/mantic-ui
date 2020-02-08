import { Component, ContentChild, ElementRef, HostListener, TemplateRef } from '@angular/core';
import { ButtonBase } from '../base/button-base';

@Component({
  selector: 'm-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent extends ButtonBase {

  @ContentChild('active', { static: true })
  public activeTemplate: TemplateRef<HTMLElement>;

  public constructor(
    readonly elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList
      .registerFixed('toggle', Number.MAX_VALUE - 2);
  }

  @HostListener('click')
  public toggle(): void {
    this.active = !this.active;
  }
}
