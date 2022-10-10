import { Component } from '@angular/core';

@Component({
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class SliderExampleComponent {
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

    public readonly inline = `<m-form>
  <m-field-group inline>
      <label>How often do you use checkboxes?</label>
      <m-field name="frequency" label="Once a week">
          <m-slider checked></m-slider>
      </m-field>
      <m-field name="frequency" label="2-3 times a week">
          <m-slider></m-slider>
      </m-field>
      <m-field name="frequency" label="Once a day">
          <m-slider></m-slider>
      </m-field>
      <m-field name="frequency" label="Twice a day">
          <m-slider></m-slider>
      </m-field>
  </m-field-group>
</m-form>`;

    public readonly grouped = `<m-form>
  <m-field-group grouped>
    <label>How often do you use checkboxes?</label>
    <m-field name="frequency2" label="Once a week">
        <m-slider checked></m-slider>
    </m-field>
    <m-field name="frequency2" label="2-3 times a week">
        <m-slider></m-slider>
    </m-field>
    <m-field name="frequency2" label="Once a day">
        <m-slider></m-slider>
    </m-field>
    <m-field name="frequency2" label="Twice a day">
        <m-slider></m-slider>
    </m-field>
  </m-field-group>
</m-form>`;
}
