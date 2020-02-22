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
}
