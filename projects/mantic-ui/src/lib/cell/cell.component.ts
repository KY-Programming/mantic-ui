import { Component, ElementRef, Input } from '@angular/core';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'm-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent extends ElementBase {

  @Input()
  public size: string;

  constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList
      .register('size')
      .registerFixed('wide')
      .registerFixed('column');
  }

}
