import { Component } from '@angular/core';

@Component({
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class SemanticToggleComponent {
  public standardCode = `<m-toggle name="example">Subscribe to weekly newsletter</m-toggle>`;
  public readonlyCode = `<m-toggle readonly></m-toggle>`;
  public checkedCode = `<m-toggle checked></m-toggle>`;
  public indeterminateCode = `<m-toggle indeterminate></m-toggle>`;
  public disabledCode = `<m-toggle disabled></m-toggle>`;
  public fittedCode = `<m-toggle fitted></m-toggle>`;

  public bindCode = `<m-toggle [readonly]="readonly" [checked]="checked" [disabled]="disabled">{{text}}</m-toggle>`;
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
