import { Component, isDevMode } from '@angular/core';
import { DemoData } from '../../helpers/demo-data';
import { CheckboxComponent, DataSourceComponent, DataSourceRequest, DropdownComponent, DropdownItemComponent, ErrorComponent, FieldComponent, FieldGroupComponent, FormComponent, FormLayout, FormRendererComponent, HeaderDirective, IconComponent, InfoComponent, InputComponent, IsFilledPipe, IsMailPipe, MessageComponent, SegmentComponent, SliderComponent, SubmitComponent, TabComponent, TabGroupComponent, TextareaComponent, TitlePipe, ToggleComponent } from '@mantic-ui/angular';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';
import { MyValidationPipe } from './my-validation.pipe';

@Component({
    selector: 'app-form-example',
    standalone: true,
    imports: [CommonModule, HeaderComponent, TabGroupComponent, TabComponent, IconComponent, HeaderDirective, ExampleComponent, ExampleCodeComponent, FormComponent, FieldComponent, InputComponent, CheckboxComponent, SubmitComponent, FieldGroupComponent, DropdownComponent, DropdownItemComponent, SegmentComponent, ToggleComponent, MessageComponent, SliderComponent, IsFilledPipe, IsMailPipe, TitlePipe, MyValidationPipe, TextareaComponent, ErrorComponent, FormRendererComponent, DataSourceComponent, InfoComponent],
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormExampleComponent {
    protected readonly isDev = isDevMode();

    public countries = DemoData.countries;
    public states = DemoData.states;

    public name1?: string;
    public name2?: string;
    public name3?: string;
    public name4?: string;
    public name5?: string;
    public name6?: string;
    public email1?: string;
    public email2?: string;

    public readonly code1 = `<m-form>
  <m-field name="first-name" label="First Name">
      <m-input placeholder="First Name"></m-input>
  </m-field>
  <m-field name="last-name" label="Last Name">
      <m-input placeholder="Last Name"></m-input>
  </m-field>
  <m-field>
      <m-checkbox>I agree to the Terms and Conditions</m-checkbox>
  </m-field>
  <m-submit>Submit</m-submit>
</m-form>`;

    public readonly code2 = `<m-form>
  <h4 m-header dividing>Shipping Information</h4>
  <m-field label="Name">
      <m-field-group>
          <m-field name="shipping[first-name]">
              <m-input placeholder="First Name"></m-input>
          </m-field>
          <m-field name="shipping[last-name]">
              <m-input placeholder="First Name"></m-input>
          </m-field>
      </m-field-group>
  </m-field>
  <m-field label="Billing Address">
      <m-field-group>
          <m-field [size]="12" name="shipping[address]">
              <m-input placeholder="Street Address"></m-input>
          </m-field>
          <m-field [size]="4" name="shipping[address-2]">
              <m-input placeholder="Apt #"></m-input>
          </m-field>
      </m-field-group>
  </m-field>
  <m-field-group>
      <m-field label="State">
          <m-dropdown fluid [items]="states" placeholder="State"></m-dropdown>
      </m-field>
      <m-field label="Country">
          <m-dropdown fluid search [items]="countries" placeholder="Select Country"></m-dropdown>
      </m-field>
  </m-field-group>
  <h4 m-header dividing>Billing Information</h4>
  <m-field label="Card Type" name="card[type]">
      <m-dropdown placeholder="Type">
          <m-dropdown-item value="visa" icon="visa">Visa</m-dropdown-item>
          <m-dropdown-item value="amex" icon="amex">American Express</m-dropdown-item>
          <m-dropdown-item value="discover" icon="discover">Discover</m-dropdown-item>
      </m-dropdown>
  </m-field>
  <m-field-group>
      <m-field label="Card Number" name="card[number]" size="7">
          <m-input placeholder="Card #" maxlength="16"></m-input>
      </m-field>
      <m-field size="3" name="card[cvc]" label="CVC">
          <m-input placeholder="CVC" maxlength="3"></m-input>
      </m-field>
      <m-field size="6" label="Expiration">
          <m-field-group>
              <m-field>
                  <m-dropdown fluid search placeholder="Month">
                      <m-dropdown-item value="1">January</m-dropdown-item>
                      <m-dropdown-item value="2">February</m-dropdown-item>
                      <m-dropdown-item value="3">March</m-dropdown-item>
                      <m-dropdown-item value="4">April</m-dropdown-item>
                      <m-dropdown-item value="5">May</m-dropdown-item>
                      <m-dropdown-item value="6">June</m-dropdown-item>
                      <m-dropdown-item value="7">July</m-dropdown-item>
                      <m-dropdown-item value="8">August</m-dropdown-item>
                      <m-dropdown-item value="9">September</m-dropdown-item>
                      <m-dropdown-item value="10">October</m-dropdown-item>
                      <m-dropdown-item value="11">November</m-dropdown-item>
                      <m-dropdown-item value="12">December</m-dropdown-item>
                  </m-dropdown>
              </m-field>
              <m-field name="card[expire-year]">
                  <m-input maxlength="4" placeholder="Year"></m-input>
              </m-field>
          </m-field-group>
      </m-field>
  </m-field-group>
  <h4 m-header dividing>Receipt</h4>
  <m-field label="Send Receipt To">
      <m-dropdown fluid multiple search placeholder="Saved Contacts"></m-dropdown>
  </m-field>
  <m-segment>
      <m-field name="gift">
          <m-toggle>Do not include a receipt in the package</m-toggle>
      </m-field>
  </m-segment>
  <m-submit>Submit Order</m-submit>
</m-form>`;

    public readonly code3 = `<m-form>
  <m-field label="User Input">
      <m-input></m-input>
  </m-field>
</m-form>`;

    public readonly codeFieldHint = `<m-field hint="Show a hint with an icon">`;

    public readonly code4 = `<m-form>
  <m-field-group>
    <m-field name="first-name" label="First name">
        <m-input placeholder="First Name"></m-input>
    </m-field>
    <m-field name="middle-name" label="Middle name">
        <m-input placeholder="Middle Name"></m-input>
    </m-field>
    <m-field name="last-name" label="Last name">
        <m-input placeholder="Last Name"></m-input>
    </m-field>
  </m-field-group>
</m-form>`;

    public readonly code5 = `<m-form>
  <m-field-group inline>
      <m-field name="first-name" label="Name" size="8">
          <m-input placeholder="First Name"></m-input>
      </m-field>
      <m-field name="middle-name" size="3">
          <m-input placeholder="Middle Name"></m-input>
      </m-field>
      <m-field name="last-name" size="5">
          <m-input placeholder="Last Name"></m-input>
      </m-field>
  </m-field-group>
</m-form>`;

    public readonly code6 = `<m-form>
  <m-field name="text" label="Text">
    <textarea></textarea>
  </m-field>
  <m-field name="short-text" label="Short Text">
    <textarea rows="2"></textarea>
  </m-field>
</m-form>`;

    public readonly code7 = `<m-form>
  <m-field label="Checkbox">
      <m-checkbox></m-checkbox>
  </m-field>
  <m-field label="Slider">
      <m-slider></m-slider>
  </m-field>
  <m-field label="Toggle">
      <m-toggle></m-toggle>
  </m-field>
</m-form>`;

    public readonly states1 = `<m-form loading>
  <m-field label="Email">
      <m-input type="email" placeholder="hello@ky-programming.de"></m-input>
  </m-field>
</m-form>`;

    public readonly states2 = `<m-form success>
  <m-field label="Email">
      <m-input type="email" placeholder="hello@ky-programming.de"></m-input>
  </m-field>
  <m-message success header="Form Completed">
      <p>You're all signed up for the newsletter.</p>
  </m-message>
  <m-submit>Submit</m-submit>
</m-form>`;

    public readonly states3 = `<m-form error>
  <m-field label="Email">
    <m-input type="email" placeholder="hello@ky-programming.de"></m-input>
  </m-field>
  <m-message error header="Action Forbidden">
    <p>You can only sign up for an account once with a given e-mail address.</p>
  </m-message>
  <m-submit>Submit</m-submit>
</m-form>`;

    public readonly states4 = `<m-form warning>
  <m-field label="Email">
      <m-input type="email" placeholder="hello@ky-programming.de"></m-input>
  </m-field>
  <m-message warning header="Could you check something!">
      <p>That e-mail has been subscribed, but you have not yet clicked the verification link in your e-mail.</p>
  </m-message>
  <m-submit>Submit</m-submit>
</m-form>`;

    public readonly states5 = `<m-form>
  <m-field-group>
      <m-field label="First Name" error>
          <m-input placeholder="First Name"></m-input>
      </m-field>
      <m-field label="Last Name">
          <m-input placeholder="Last Name"></m-input>
      </m-field>
  </m-field-group>
  <m-field label="Gender" error>
      <m-dropdown placeholder="Select">
          <m-dropdown-item value="male">Male</m-dropdown-item>
          <m-dropdown-item value="female">Female</m-dropdown-item>
      </m-dropdown>
  </m-field>
  <m-field label="I agree to the Terms and Conditions" inline error>
      <m-checkbox></m-checkbox>
  </m-field>
</m-form>`;

    public readonly states6 = `<m-form>
  <m-field-group>
      <m-field label="First Name" disabled>
          <m-input placeholder="First Name"></m-input>
      </m-field>
      <m-field label="Last Name" disabled>
          <m-input placeholder="Last Name"></m-input>
      </m-field>
  </m-field-group>
</m-form>`;

    public readonly states7 = `<m-form>
    <m-field-group>
        <m-field label="First Name" readonly>
            <m-input placeholder="First Name"></m-input>
        </m-field>
        <m-field label="Last Name" readonly>
            <m-input placeholder="Last Name"></m-input>
        </m-field>
    </m-field-group>
</m-form>`;

    public readonly mandatory1 = `<m-form>
    <m-field label="Name" [valid]="name | mIsFilled">
        <m-input [(value)]="name"></m-input>
    </m-field>
</m-form>`;

    public readonly mandatory2 = `<m-form>
    <m-field label="Name" [valid]="name | mIsFilled:'can not be empty. Sorry!'">
        <m-input [(value)]="name"></m-input>
    </m-field>
</m-form>`;

    public readonly mandatory3 = `<m-form>
    <m-field label="Name" [valid]="name | mIsFilled | mTitle:'-Better title than Name-'">
        <m-input [(value)]="name"></m-input>
    </m-field>
</m-form>`;

    public readonly emailCode1 = `<m-form>
    <m-field label="Email" [valid]="email | mIsMail">
        <m-input type="email" [(value)]="email"></m-input>
    </m-field>
</m-form>`;

    public readonly emailCode2 = `<m-form>
    <m-field label="Email" [valid]="email | mIsFilled | mIsMail">
        <m-input type="email" [(value)]="email"></m-input>
    </m-field>
</m-form>`;

    public readonly custom1 = `<m-form>
    <m-field label="Name" [valid]="name | myValidation">
        <m-input [(value)]="name"></m-input>
    </m-field>
</m-form>`;

    public readonly custom2 = `import { Pipe, PipeTransform } from '@angular/core';
import { FormValidation, isFormValidation, ValidationPipe } from '@mantic-ui/angular';

@Pipe({
  name: 'myValidation'
})
export class MyValidationPipe implements ValidationPipe, PipeTransform {
  public transform(value: unknown, ...args: unknown[]): FormValidation {
    // Check the type of value and returns the FormValidation from previous validation step or undefined
    const validation = isFormValidation(value) ? value : undefined;
    // Check if the previous validation is already invalid and stop validation
    if (validation && !validation.valid) {
      return validation;
    }
    // In this example we only check strings. All other types where converted to undefined to force an invalid result
    const rawValue = validation ? validation.value : value;
    const stringValue = typeof rawValue === 'string' ? rawValue : undefined;
    return {
      // Do the validation
      valid: stringValue && stringValue.indexOf('a') >= 0,
      // Create an validation message. args[0] can be used to override the validation message
      message: value ? undefined : args[0] as string || 'has to contain at least one \\\'a\\\'',
      // Provide the value for the next validation step
      value
    };
  }
}`;
    public rendererLayoutError?: string;
    public rendererLayout: FormLayout = {
        elements: [
            {
                'elementType': 'h3',
                'text': 'Header 3',
                'dividing': true,
                'field': ''
            },
            {
                'elementType': 'dropdown',
                'label': 'Status ändern auf:',
                'field': 'status',
                'dataSource': 'status',
                'valueField': 'uid',
                'textField': ['name', 'description'],
                'textFieldFormatter': '$0 - $1',
                'prefixItems': [{ value: undefined, text: '~ Status nicht ändern ~' }]
            }
        ]
    };
    public rendererData = {};
    public rendererDataError?: string;

    public requestData(request: DataSourceRequest): void {
        if (request.key === 'status') {
            request.resolve([
                { uid: 0, name: '0', description: 'Zero' },
                { uid: 1, name: '1', description: 'One' },
                { uid: 2, name: '2', description: 'Two' }
            ]);
        }
    }

    public parseLayout(json: string | undefined | null): void {
        this.rendererLayoutError = undefined;
        try {
            this.rendererLayout = json ? JSON.parse(json) : undefined;
        } catch (error) {
            this.rendererLayoutError = error instanceof Error ? error.message : error?.toString();
        }
    }

    public parseData(json: string | undefined | null): void {
        this.rendererDataError = undefined;
        try {
            this.rendererData = json ? JSON.parse(json) : undefined;
        } catch (error) {
            this.rendererDataError = error instanceof Error ? error.message : error?.toString();
        }
    }

    public readonly inverted = `<m-form inverted></m-form>`;
}
