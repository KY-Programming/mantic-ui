import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { DividerComponent, FieldComponent, FieldGroupComponent, FormComponent, HeaderDirective, IconComponent, InputComponent, SegmentComponent, TabComponent, TabGroupComponent, ToggleComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';

@Component({
    selector: 'app-toggle-example',
    standalone: true,
    imports: [CommonModule, HeaderComponent, TabGroupComponent, TabComponent, IconComponent, HeaderDirective, ExampleComponent, ExampleCodeComponent, ToggleComponent, FormComponent, FieldGroupComponent, FieldComponent, SegmentComponent, InputComponent, DividerComponent],
    templateUrl: './toggle.component.html',
    styleUrls: ['./toggle.component.scss']
})
export class ToggleExampleComponent {
    public standardCode = `<m-toggle name="example">Subscribe to weekly newsletter</m-toggle>`;
    public readonlyCode = `<m-toggle readonly></m-toggle>`;
    public checkedCode = `<m-toggle checked></m-toggle>`;
    public indeterminateCode = `<m-toggle indeterminate></m-toggle>`;
    public disabledCode = `<m-toggle disabled></m-toggle>`;
    public fittedCode = `<m-toggle fitted></m-toggle>`;

    public bindCode = `<m-toggle [readonly]="readonly" [checked]="checked" [disabled]="disabled">{{text}}</m-toggle>`;
    private readonlyField = false;
    private checkedField = false;
    private disabledField = false;

    public text? = 'Label Text';

    public get readonly(): boolean {
        return this.readonlyField;
    }

    public set readonly(value: boolean) {
        this.readonlyField = value;
        this.disabledField = false;
    }

    public get checked(): boolean {
        return this.checkedField;
    }

    public set checked(value: boolean) {
        this.checkedField = value;
    }

    public get disabled(): boolean {
        return this.disabledField;
    }

    public set disabled(value: boolean) {
        this.disabledField = value;
        this.readonlyField = false;
    }

    public readonly inline = `<m-form>
  <m-field-group inline>
      <label>How often do you use checkboxes?</label>
      <m-field name="frequency" label="Once a week">
          <m-toggle checked></m-toggle>
      </m-field>
      <m-field name="frequency" label="2-3 times a week">
          <m-toggle></m-toggle>
      </m-field>
      <m-field name="frequency" label="Once a day">
          <m-toggle></m-toggle>
      </m-field>
      <m-field name="frequency" label="Twice a day">
          <m-toggle></m-toggle>
      </m-field>
  </m-field-group>
</m-form>`;

    public readonly grouped = `<m-form>
  <m-field-group grouped>
    <label>How often do you use checkboxes?</label>
    <m-field name="frequency2" label="Once a week">
        <m-toggle checked></m-toggle>
    </m-field>
    <m-field name="frequency2" label="2-3 times a week">
        <m-toggle></m-toggle>
    </m-field>
    <m-field name="frequency2" label="Once a day">
        <m-toggle></m-toggle>
    </m-field>
    <m-field name="frequency2" label="Twice a day">
        <m-toggle></m-toggle>
    </m-field>
  </m-field-group>
</m-form>`;
}
