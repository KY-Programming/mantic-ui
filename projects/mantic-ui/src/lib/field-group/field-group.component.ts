import { Component, ContentChildren, ElementRef, Input, QueryList } from '@angular/core';
import { ElementBase } from '../base/element-base';
import { FieldComponent } from '../field/field.component';

export declare type FieldsType = '' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight' | 'nine' | 'ten' | number;

@Component({
  selector: 'm-field-group',
  templateUrl: './field-group.component.html',
  styleUrls: ['./field-group.component.scss']
})
export class FieldGroupComponent extends ElementBase {
  private readonly fieldClasses: FieldsType[] = ['', '', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  private fieldsValue: FieldsType;
  private fieldsAutoValue: FieldsType;

  @Input()
  public set fields(value: FieldsType) {
    if (typeof value === 'number') {
      this.fieldsValue = this.fieldClasses[value];
    }
    else {
      this.fieldsValue = value;
    }
  }
  public get fields(): FieldsType {
    return this.fieldsValue || this.fieldsAutoValue;
  }

  @ContentChildren(FieldComponent)
  public set fieldComponents(query: QueryList<FieldComponent>) {
    if (query) {
      this.refreshFields(query.length);
      query.changes.subscribe(() => this.refreshFields(query.length));
    }
  }

  public constructor(
    readonly elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.ui = false;
    this.classList
      .register('fields')
      .registerFixed('fields', Number.MAX_VALUE - 1);
  }

  private refreshFields(count: number): void {
    this.fieldsAutoValue = this.fieldClasses[count];
  }

}
