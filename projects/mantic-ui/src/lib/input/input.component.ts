import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { LabeledBase } from '../base/labeled-base';

@Component({
  selector: 'm-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent extends LabeledBase {

  @Input()
  public icon: string;

  @Input()
  public iconPosition: 'left' | 'right' = 'right';

  @Input()
  public focused: boolean;

  @Input()
  public loading: boolean;

  @Input()
  public disabled: boolean;

  @Input()
  public hasError: boolean;

  @Input()
  public transparent: boolean;

  /* HTMLInputElement Properties */
  // TODO: Add missing properties
  // TODO: Give the possibility to inject an input-tag via ng-content

  @Input()
  public type: string;

  @Input()
  public placeholder: string;

  @Input()
  public value: string;

  @Output()
  public readonly valueChange = new EventEmitter<string>();

  public get isRight(): boolean {
    return this.label && this.label.position === 'right' || this.labelDropdown && this.labelDropdown.position === 'right';
  }

  public onChange(): void {
    this.valueChange.emit(this.value);
  }

  public constructor(
    readonly elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList
      .registerAction('icon', (entry, value) => entry.classes = value ? this.iconPosition || '' : '')
      .registerBoolean('icon')
      .registerBoolean('focused', 'focus')
      .registerBoolean('loading')
      .registerBoolean('disabled')
      .registerBoolean('transparent')
      .registerBoolean('hasError', 'error')
      .registerFixed('input', Number.MAX_VALUE - 1);
  }
}
