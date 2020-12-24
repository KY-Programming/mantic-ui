import { Component, ElementRef, Input } from '@angular/core';
import { FieldSize, fieldSizes } from '../models/field-size';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'm-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent extends BaseComponent {
  private columnsValue: FieldSize;

  @Input()
  public stretched: boolean;

  @Input()
  public set columns(value: FieldSize) {
    const sizeNumber = value ? parseInt(value.toString()) : undefined;
    if (sizeNumber && !Number.isNaN(sizeNumber)) {
      this.columnsValue = fieldSizes[value];
    } else {
      this.columnsValue = value;
    }
  }
  public get columns(): FieldSize {
    return this.columnsValue;
  }

  constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.ui = false;
    this.classList
      .register('columns')
      .registerAction('columns', (entry, value) => entry.isActive = !!value, undefined, 'column')
      .registerBoolean('stretched')
      .registerFixed('row');
  }

}
