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
  public standardCode = `<m-input>
  <input type="text" placeholder="Search..." maxlength="3">
</m-input>`;
  public readonly states1 = `<m-input type="text" placeholder="Search..." focused></m-input>`;
  public readonly states2 = `<m-input type="text" placeholder="Search..." icon="search" iconPosition="left" loading></m-input>`;
  public readonly states3 = `<m-input type="text" placeholder="Search..." icon="search" loading></m-input>`;
  public readonly states4 = `<m-input type="text" placeholder="Search..." disabled></m-input>`;
  public readonly states5 = `<m-input type="text" placeholder="Search..." icon="search" disabled></m-input>`;
  public readonly states6 = `<m-input type="text" placeholder="Search..." hasError></m-input>`;

  public readonly variations1 = `<m-input type="text" placeholder="Search..." icon="search"></m-input>`;
  public readonly variations2 = `<m-input type="text" placeholder="Search..." icon="users" iconPosition="left"></m-input>`;
  public readonly variations3 = `<m-input type="text" placeholder="Search..." icon="circular search"></m-input>`;
  public readonly variations4 = `<m-input type="text" placeholder="Search..." icon="inverted circular search"></m-input>`;
  public readonly variations5 = `<m-input type="text" placeholder="mysite.com">
  <m-label>http://</m-label>
</m-input>`;
  public readonly variations6 = `<m-input type="text" placeholder="Find domain">
  <m-label-dropdown position="right" value=".com" [items]="['.com', '.net', '.org']"></m-label-dropdown>
</m-input>`;
  public readonly variations7 = `<m-input type="number" placeholder="Enter weight..">
  <m-label position="right" class="basic">kg</m-label>
</m-input>`;
  public readonly variations8 = `<div class="ui right labeled input">
  <label for="amount" class="ui label">$</label>
  <input type="text" placeholder="Amount" id="amount">
  <div class="ui basic label">.00</div>
</div>`;
  public readonly variations9 = `<m-input icon="tags" iconPosition="left" placeholder="Enter tags">
  <m-label position="right" class="tag">Add Tag</m-label>
</m-input>`;
  public readonly variations10 = `<m-input type="text" class="corner" placeholder="Search...">
  <m-label position="left" class="left corner">
      <m-icon icon="asterisk"></m-icon>
  </m-label>
</m-input>`;
}
