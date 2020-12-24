import { Component, ElementRef, Input } from '@angular/core';
import { FieldSize, fieldSizes } from '../models/field-size';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'm-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent extends BaseComponent {
  private columnsValue: FieldSize;

  @Input()
  public divided: boolean;

  @Input()
  public vertically: boolean;

  @Input()
  public celled: boolean;

  @Input()
  public internally: boolean;

  @Input()
  public width: 'equal';

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
    this.classList
      .registerBoolean('vertically')
      .registerBoolean('divided')
      .register('columns')
      .registerAction('columns', (entry, value) => entry.isActive = !!value, undefined, 'column')
      .registerBoolean('internally')
      .registerBoolean('celled')
      .registerBoolean('equal')
      .register('width')
      .registerAction('width', (entry, value) => entry.isActive = !!value, undefined, 'width')
      .registerFixed('grid');
  }

}
