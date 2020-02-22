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
}
