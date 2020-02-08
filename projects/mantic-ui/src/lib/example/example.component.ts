import { Component, Input } from '@angular/core';

@Component({
  selector: 'm-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {

  @Input()
  public header: string;

  @Input()
  public description: string;

  @Input()
  public code: string;

  @Input()
  public type: string;

  @Input()
  public showCode: boolean;

  public toggleCode(): void {
    this.showCode = !this.showCode;
  }
}
