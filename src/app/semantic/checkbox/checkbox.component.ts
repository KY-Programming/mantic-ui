import { Component } from '@angular/core';

@Component({
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class SemanticCheckboxComponent {
  public standardCode = `<m-checkbox name="example">Make my profile visible</m-checkbox>`;
  public readonlyCode = `<m-checkbox readonly></m-checkbox>`;
  public checkedCode = `<m-checkbox checked></m-checkbox>`;
  public indeterminateCode = `<m-checkbox indeterminate></m-checkbox>`;
  public disabledCode = `<m-checkbox disabled></m-checkbox>`;
  public fittedCode = `<m-checkbox fitted></m-checkbox>`;
}
