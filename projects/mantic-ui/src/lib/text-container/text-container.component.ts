import { Component } from '@angular/core';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'm-text-container',
  templateUrl: './text-container.component.html',
  styleUrls: ['./text-container.component.scss']
})
export class TextContainerComponent extends ElementBase {

  constructor() {
    super();
    this.classList
      .registerFixed('text')
      .registerFixed('container');
  }

}
