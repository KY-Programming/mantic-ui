import { Component } from '@angular/core';
import { DemoData } from '../../helpers/demo-data';

@Component({
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class SemanticFormComponent {

    public countries = DemoData.countries;
    public states = DemoData.states;

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
  <m-button type="submit">Submit</m-button>
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
  <m-button type="submit">Submit Order</m-button>
</m-form>`;

    public readonly code3 = `<m-form>
  <m-field label="User Input">
      <m-input></m-input>
  </m-field>
</m-form>`;

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
  <m-button type="submit">Submit</m-button>
</m-form>`;

    public readonly states3 = `<m-form error>
  <m-field label="Email">
    <m-input type="email" placeholder="hello@ky-programming.de"></m-input>
  </m-field>
  <m-message error header="Action Forbidden">
    <p>You can only sign up for an account once with a given e-mail address.</p>
  </m-message>
  <m-button type="submit">Submit</m-button>
</m-form>`;

    public readonly states4 = `<m-form warning>
  <m-field label="Email">
      <m-input type="email" placeholder="hello@ky-programming.de"></m-input>
  </m-field>
  <m-message warning header="Could you check something!">
      <p>That e-mail has been subscribed, but you have not yet clicked the verification link in your e-mail.</p>
  </m-message>
  <m-button type="submit">Submit</m-button>
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
}
