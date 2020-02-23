import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'm-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {
  private headerField: string;

  @Input()
  public set header(value: string) {
    this.headerField = value;
    this.refreshId();
  }
  public get header(): string {
    return this.headerField;
  }

  @Input()
  public description: string;

  @Input()
  public code: string;

  @Input()
  public showCode: boolean;

  @Input()
  public languages: string[] = ['html'];

  @HostBinding('id')
  public id: string;

  public toggleCode(): void {
    this.showCode = !this.showCode;
  }

  private refreshId(): void {
    this.id = this.header ? this.header.replace(/[^\a-zA-Z0-9]/g, '').toLocaleLowerCase() : undefined;
  }
}
