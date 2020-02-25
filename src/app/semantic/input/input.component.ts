import { Component } from '@angular/core';

// tslint:disable: member-ordering
@Component({
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class SemanticInputComponent {
  private focusValue = false;
  private loadingValue = false;
  private disabledValue = false;
  private errorValue = false;

  public inputValue = 'Default Value';
  public type = 'text';
  public icon = 'search';
  public iconPosition = 'left';
  public selectedTabName: string;

  public get focus(): boolean {
    return this.focusValue;
  }
  public set focus(value: boolean) {
    this.reset();
    this.focusValue = value;
  }

  public get loading(): boolean {
    return this.loadingValue;
  }
  public set loading(value: boolean) {
    this.reset();
    this.loadingValue = value;
  }

  public get disabled(): boolean {
    return this.disabledValue;
  }
  public set disabled(value: boolean) {
    this.reset();
    this.disabledValue = value;
  }

  public get error(): boolean {
    return this.errorValue;
  }
  public set error(value: boolean) {
    this.reset();
    this.errorValue = value;
  }

  public fluid: boolean;

  private reset(): void {
    this.focusValue = false;
    this.loadingValue = false;
    this.disabledValue = false;
    this.errorValue = false;
  }

  public inputMessage: string;
  public valueChange(event: string): void {
    this.inputMessage = `Value changed to: ${event}`;
    setTimeout(() => this.inputMessage = undefined, 2000);
  }

  public code1 = `<m-input type="text" placeholder="Search..." [(value)]="value"></m-input>`;
  public code2 = `<m-input type="text" placeholder="Search..." [(value)]="inputValue"></m-input>`;
  public code3 = `<m-input [type]="type" placeholder="Search..." [icon]="icon" [iconPosition]="iconPosition" [focused]="focus" [loading]="loading" [disabled]="disabled" [hasError]="error" [fluid]="fluid"></m-input>`;
  public eventCode = `<m-input (valueChange)="valueChange($event)"></m-input>`;
  public numberCode = `<m-input type="number" [(numericValue)]="value"></m-input>`;
}
