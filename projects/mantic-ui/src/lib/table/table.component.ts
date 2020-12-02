import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'm-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends ElementBase {

  @Input()
  public celled = true;

  @Input()
  public unstackable = false;

  constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList
      .registerBoolean('celled')
      .registerBoolean('unstackable')
      .registerFixed('table', Number.MAX_VALUE - 1);
  }

}
