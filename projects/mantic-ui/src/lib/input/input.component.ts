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

  @Input()
  public set numericValue(value: number) {
    this.value = value === undefined ? undefined : value.toString();
  }
  public get numericValue(): number {
    return parseInt(this.value);
  }

  @Input()
  public fluid: boolean;

  @Input()
  public min: number;

  @Input()
  public max: number;

  @Output()
  public readonly valueChange = new EventEmitter<string>();

  @Output()
  public readonly numericValueChange = new EventEmitter<number>();

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
      .registerBoolean('fluid')
      .registerBoolean('hasError', 'error')
      .registerFixed('input', Number.MAX_VALUE - 1);
  }

  public onChange(): void {
    this.valueChange.emit(this.value);
    this.numericValueChange.emit(this.numericValue);
  }
}
