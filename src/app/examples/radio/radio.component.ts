import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { DividerComponent, FieldComponent, FieldGroupComponent, FormComponent, HeaderDirective, IconComponent, InputComponent, RadioComponent, SegmentComponent, TabComponent, TabGroupComponent, ToggleComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';

@Component({
    selector: 'app-radio-example',
    standalone: true,
    imports: [CommonModule, HeaderComponent, TabGroupComponent, TabComponent, IconComponent, HeaderDirective, ExampleComponent, ExampleCodeComponent, RadioComponent, FormComponent, FieldGroupComponent, FieldComponent, SegmentComponent, InputComponent, ToggleComponent, DividerComponent],
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.scss']
})
export class RadioExampleComponent {
    public standardCode = `<m-radio name="example">Subscribe to weekly newsletter</m-radio>`;
    public readonlyCode = `<m-radio readonly></m-radio>`;
    public checkedCode = `<m-radio checked></m-radio>`;
    public indeterminateCode = `<m-radio indeterminate></m-radio>`;
    public disabledCode = `<m-radio disabled></m-radio>`;
    public fittedCode = `<m-radio fitted></m-radio>`;

    public bindCode = `<m-radio [readonly]="readonly" [checked]="checked" [disabled]="disabled">{{text}}</m-radio>`;
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
          <m-radio checked></m-radio>
      </m-field>
      <m-field name="frequency" label="2-3 times a week">
          <m-radio></m-radio>
      </m-field>
      <m-field name="frequency" label="Once a day">
          <m-radio></m-radio>
      </m-field>
      <m-field name="frequency" label="Twice a day">
          <m-radio></m-radio>
      </m-field>
  </m-field-group>
</m-form>`;

    public readonly grouped = `<m-form>
  <m-field-group grouped>
    <label>How often do you use checkboxes?</label>
    <m-field name="frequency2" label="Once a week">
        <m-radio checked></m-radio>
    </m-field>
    <m-field name="frequency2" label="2-3 times a week">
        <m-radio></m-radio>
    </m-field>
    <m-field name="frequency2" label="Once a day">
        <m-radio></m-radio>
    </m-field>
    <m-field name="frequency2" label="Twice a day">
        <m-radio></m-radio>
    </m-field>
  </m-field-group>
</m-form>`;

    public readonly inverted = `<m-radio inverted></m-radio>`;
}
