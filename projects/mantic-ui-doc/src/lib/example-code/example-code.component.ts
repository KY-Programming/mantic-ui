import { Component, ElementRef, Input } from '@angular/core';
import { DimmableService, SegmentComponent } from '@mantic-ui/angular';

@Component({
  selector: 'm-example-code',
  templateUrl: './example-code.component.html',
  styleUrls: ['./example-code.component.scss'],
  providers: [DimmableService]
})
export class ExampleCodeComponent extends SegmentComponent {

  @Input()
  public label: string;

  @Input()
  public code: string;

  @Input()
  public languages: string[] = ['html'];

  public constructor(
    elementRef: ElementRef<HTMLElement>,
    dimmableService: DimmableService
  ) {
    super(elementRef, dimmableService);
    this.classList.register('label', 'code', 'languages');
  }
}
