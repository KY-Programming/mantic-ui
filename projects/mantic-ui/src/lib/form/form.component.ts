import { Component, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { ElementBase } from '../base/element-base';
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'm-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent extends ElementBase {
  private fieldComponentsValue: QueryList<FieldComponent>;
  private subscriptions: Subscription[];
  private isValidValue = false;

  public get fieldComponents(): QueryList<FieldComponent> {
    return this.fieldComponentsValue;
  }

  @ContentChildren(FieldComponent)
  public set fieldComponents(value: QueryList<FieldComponent>) {
    this.releaseFields();
    this.fieldComponentsValue = value;
    this.subscribeFields();
    this.refreshIsValid();
    if (this.fieldComponentsValue) {
      this.fieldComponentsValue.changes.subscribe(() => {
        this.releaseFields();
        this.subscribeFields();
      });
    }
  }

  @Input()
  public action: string;

  @Input()
  public autocomplete: 'on' | 'off';

  @Input()
  public enctype: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';

  @Input()
  public method: 'get' | 'post';

  @Input()
  public name: string;

  @Input()
  public novalidate: boolean;

  @Input()
  public loading: boolean;

  @Input()
  public success: boolean;

  @Input()
  public error: boolean;

  @Input()
  public warning: boolean;

  @Input()
  public target: '_blank' | '_self' | '_parent' | '_top';

  public get isValid(): boolean {
    return this.isValidValue;
  }

  @Input()
  public set isValid(_: boolean) {
    // Ignore the value from the binding
  }

  @Output()
  public readonly submit = new EventEmitter<void>();

  @Output()
  public readonly isValidChange = new EventEmitter<boolean>();

  public constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.ui = false;
    this.classList
      .registerBoolean('loading', '')
      .registerBoolean('success', '')
      .registerBoolean('warning', '')
      .registerBoolean('error', '');
  }

  private releaseFields(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
      this.subscriptions = undefined;
    }
  }

  private subscribeFields(): void {
    if (this.fieldComponents) {
      this.subscriptions = this.fieldComponents.map(field => field.errorChange.subscribe(() => this.refreshIsValid()));
    }
  }

  private refreshIsValid(): void {
    const hasError = this.fieldComponents.some(field => field.error);
    const isValid = !hasError;
    this.error = hasError;
    if (this.isValidValue !== isValid) {
      this.isValidValue = isValid;
      // Delay the notification be fire the change outside the check to ensure a change detection run will be started
      setTimeout(() => this.isValidChange.emit(isValid));
    }
  }

  public validateAndSubmit(): void {
    if (this.error) {
      this.fieldComponents.forEach(field => field.forceValidation());
    }
    else {
      this.submit.emit();
    }
  }
}
