import { ApplicationRef, Component, ContentChild, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'm-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent extends BaseComponent {
  private textareaElement: HTMLTextAreaElement;
  private readonlyValue: boolean;
  private disabledValue: boolean;

  @ContentChild('textarea')
  public set contentTextareaElement(textarea: HTMLTextAreaElement) {
    this.textareaElement = textarea;
    this.refreshTextarea();
  }

  @Input()
  public name: string;

  @Input()
  public set disabled(value: boolean) {
    this.disabledValue = value;
    this.refreshTextarea();
  }
  public get disabled(): boolean {
    return this.disabledValue;
  }

  @Input()
  public set readonly(value: boolean) {
    this.readonlyValue = value;
    this.refreshTextarea();
  }
  public get readonly(): boolean {
    return this.readonlyValue;
  }

  @Input()
  public hasError: boolean;

  @Input()
  public placeholder: string;

  @Input()
  public value: string;

  @Output()
  public readonly valueChange = new EventEmitter<string>();

  public constructor(
    elementRef: ElementRef<HTMLElement>,
    private readonly applicationRef: ApplicationRef
  ) {
    super(elementRef);
    this.classList
      .registerBoolean('disabled')
      .registerBoolean('readonly')
      .registerBoolean('hasError', 'error')
      .registerFixed('textarea', Number.MAX_VALUE - 1);
  }

  public onChange(): void {
    this.valueChange.emit(this.value);
  }

  public forceChange(): void {
    const value = this.value;
    // tslint:disable-next-line: no-null-keyword => Currently no other way available to force rebind.
    const tempValue = value === undefined ? null : undefined;
    this.valueChange.emit(tempValue);
    this.applicationRef.tick();
    this.valueChange.emit(value);
  }

  private refreshTextarea(): void {
    if (!this.textareaElement) {
      return;
    }
    this.textareaElement.disabled = this.disabled;
    this.textareaElement.readOnly = this.readonly;
  }
}
