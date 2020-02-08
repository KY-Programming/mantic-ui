import { Component } from '@angular/core';

// tslint:disable: member-ordering
@Component({
  selector: 'app-semantic-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class FomanticInputComponent {
  private focusValue = false;
  private loadingValue = false;
  private disabledValue = false;
  private errorValue = false;

  public inputValue = 'Default Value';
  public type = 'text';
  public icon = 'search';
  public iconPosition = 'left';

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
}
