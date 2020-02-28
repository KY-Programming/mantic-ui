import { Component, ElementRef, Input } from '@angular/core';
import { ElementBase } from '../base/element-base';
import { AnimationDirection } from './animation-direction';

@Component({
  selector: 'm-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss']
})
export class AnimationComponent extends ElementBase {

  @Input()
  public hidden = true;

  @Input()
  public direction: AnimationDirection;

  constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.ui = false;
    this.classList
      .registerBoolean('hidden')
      .registerFixed('content');
  }
}
