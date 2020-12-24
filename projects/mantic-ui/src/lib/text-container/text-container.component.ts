import { Component, ElementRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'm-text-container',
  templateUrl: './text-container.component.html',
  styleUrls: ['./text-container.component.scss']
})
export class TextContainerComponent extends BaseComponent {

  constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList
      .registerFixed('text')
      .registerFixed('container');
  }

}
