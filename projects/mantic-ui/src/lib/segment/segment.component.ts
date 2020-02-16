import { Component, ElementRef, Input } from '@angular/core';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'm-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss']
})
export class SegmentComponent extends ElementBase {

  public static readonly defaults = { raised: false };

  @Input()
  public inverted: boolean;

  @Input()
  public raised: boolean;

  @Input()
  public vertical: boolean;

  @Input()
  public placeholder: boolean;

  @Input()
  public attached: 'top' | 'bottom';

  public constructor(
    readonly elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.raised = SegmentComponent.defaults.raised;
    this.classList
      .registerBoolean('inverted')
      .registerBoolean('raised')
      .registerBoolean('vertical')
      .registerBoolean('placeholder')
      .registerAction('attached', (entry, value) => entry.classes = value ? value + ' attached' : '')
      .registerFixed('segment', Number.MAX_VALUE - 1);
  }
}
