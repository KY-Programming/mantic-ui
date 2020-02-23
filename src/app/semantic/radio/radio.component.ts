import { Component } from '@angular/core';

@Component({
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class SemanticRadioComponent {
  public standardCode = `<m-radio name="example">Subscribe to weekly newsletter</m-radio>`;
  public readonlyCode = `<m-radio readonly></m-radio>`;
  public checkedCode = `<m-radio checked></m-radio>`;
  public indeterminateCode = `<m-radio indeterminate></m-radio>`;
  public disabledCode = `<m-radio disabled></m-radio>`;
  public fittedCode = `<m-radio fitted></m-radio>`;

  public bindCode = `<m-radio [readonly]="readonly" [checked]="checked" [disabled]="disabled">{{text}}</m-radio>`;
  private readonlyField: boolean;
  private checkedField: boolean;
  private disabledField: boolean;

  public text = 'Label Text';

  public set readonly(value: boolean) {
    this.readonlyField = value;
    this.disabledField = false;
  }
  public get readonly(): boolean {
    return this.readonlyField;
  }

  public set checked(value: boolean) {
    this.checkedField = value;
  }
  public get checked(): boolean {
    return this.checkedField;
  }

  public set disabled(value: boolean) {
    this.disabledField = value;
    this.readonlyField = false;
  }
  public get disabled(): boolean {
    return this.disabledField;
  }
}
