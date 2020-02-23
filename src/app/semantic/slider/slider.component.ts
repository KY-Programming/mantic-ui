import { Component } from '@angular/core';

@Component({
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SemanticSliderComponent {
  public standardCode = `<m-slider name="example">Accept terms and conditions</m-slider>`;
  public readonlyCode = `<m-slider readonly></m-slider>`;
  public checkedCode = `<m-slider checked></m-slider>`;
  public indeterminateCode = `<m-slider indeterminate></m-slider>`;
  public disabledCode = `<m-slider disabled></m-slider>`;
  public fittedCode = `<m-slider fitted></m-slider>`;

  public bindCode = `<m-slider [readonly]="readonly" [checked]="checked" [disabled]="disabled">{{text}}</m-slider>`;
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
