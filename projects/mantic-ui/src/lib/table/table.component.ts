import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'm-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends BaseComponent {

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
