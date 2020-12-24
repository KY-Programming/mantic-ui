import { Component, ContentChild, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { LabeledBase } from '../base/labeled-base';

@Component({
  selector: 'm-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent extends LabeledBase {
  private inputElement: HTMLInputElement;
  private readonlyValue: boolean;
  private disabledValue: boolean;

  @ContentChild('input', { static: false })
  public set contentInputElement(input: HTMLInputElement) {
    this.inputElement = input;
    this.refreshInput();
    this.bindEvents();
  }

  @ViewChild('input', { static: false })
  public set viewInputElement(input: HTMLInputElement) {
    this.inputElement = input;
    this.bindEvents();
  }

  @Input()
  public icon: string;

  @Input()
  public iconPosition: 'left' | 'right' = 'right';

  @Input()
  public focused: boolean;

  @Input()
  public loading: boolean;

  @Input()
  public set disabled(value: boolean) {
    this.disabledValue = value;
    this.refreshInput();
  }
  public get disabled(): boolean {
    return this.disabledValue;
  }

  @Input()
  public set readonly(value: boolean) {
    this.readonlyValue = value;
    this.refreshInput();
  }
  public get readonly(): boolean {
    return this.readonlyValue;
  }

  @Input()
  public hasError: boolean;

  @Input()
  public transparent: boolean;

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
  public set dateValue(value: Date) {
    // this.value = value === undefined ? undefined : value.toISOString().replace('T', ' ').replace('Z', '');
    this.value = value === undefined ? undefined : value.toISOString().split('T')[0];
  }
  public get dateValue(): Date {
    return new Date(this.value);
  }

  @Input()
  public fluid: boolean;

  @Input()
  public min: number;

  @Input()
  public max: number;

  @Input()
  public name: string;

  @Input()
  public for: string;

  @Input()
  public maxlength: number;

  @Output()
  public readonly valueChange = new EventEmitter<string>();

  @Output()
  public readonly numericValueChange = new EventEmitter<number>();

  @Output()
  public readonly dateValueChange = new EventEmitter<Date>();

  @Output()
  public readonly keyDown = new EventEmitter<KeyboardEvent>();

  @Output()
  public readonly keyUp = new EventEmitter<KeyboardEvent>();

  @Output()
  public readonly keyPress = new EventEmitter<Event>();

  public constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList
      .registerAction('icon', (entry, value) => entry.classes = value ? this.iconPosition || '' : '')
      .registerBoolean('icon')
      .registerBoolean('focused', 'focus')
      .registerBoolean('loading')
      .registerBoolean('disabled')
      .registerBoolean('readonly')
      .registerBoolean('transparent')
      .registerBoolean('fluid')
      .registerBoolean('hasError', 'error')
      .registerFixed('input', Number.MAX_VALUE - 1);
  }

  public onChange(): void {
    this.valueChange.emit(this.value);
    this.numericValueChange.emit(this.numericValue);
    this.dateValueChange.emit(this.dateValue);
  }

  private refreshInput(): void {
    if (!this.inputElement) {
      return;
    }
    this.inputElement.disabled = this.disabled;
    this.inputElement.readOnly = this.readonly;
  }

  private bindEvents(): void {
    if (!this.inputElement) {
      return;
    }
    this.inputElement.addEventListener('keydown', event => this.keyDown.emit(event));
    this.inputElement.addEventListener('keyup', event => this.keyUp.emit(event));
    this.inputElement.addEventListener('keyPress', event => this.keyPress.emit(event));
  }
}
