import { Component, Input } from '@angular/core';

@Component({
  selector: 'm-example-frame',
  templateUrl: './example-frame.component.html',
  styleUrls: ['./example-frame.component.scss']
})
export class ExampleFrameComponent {

  @Input()
  public src: string;

}
