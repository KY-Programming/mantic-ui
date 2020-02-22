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
}
