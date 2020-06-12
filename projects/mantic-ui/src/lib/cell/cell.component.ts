import { Component, ElementRef, Input } from '@angular/core';
import { ElementBase } from '../base/element-base';
import { FieldSize, fieldSizes } from '../models/field-size';

@Component({
  selector: 'm-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent extends ElementBase {
  private sizeValue: FieldSize;

  @Input()
  public set size(value: FieldSize) {
    const sizeNumber = value ? parseInt(value.toString()) : undefined;
    if (sizeNumber && !Number.isNaN(sizeNumber)) {
      this.sizeValue = fieldSizes[value];
    } else {
      this.sizeValue = value;
    }
  }
  public get size(): FieldSize {
    return this.sizeValue;
  }

  @Input()
  public float: 'left' | 'right';

  constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.ui = false;
    this.classList
      .register('size')
      .registerAction('size', (entry, value) => entry.isActive = !!value, undefined, 'wide')
      .register('float')
      .registerAction('float', (entry, value) => entry.isActive = !!value, undefined, 'floated')
      .registerFixed('column');
  }

}
