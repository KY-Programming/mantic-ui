import { Component } from '@angular/core';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'm-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent extends ElementBase {

  public constructor() {
    super();
    this.classList
      .registerFixed('breadcrumb', Number.MAX_VALUE - 1);
  }
}
