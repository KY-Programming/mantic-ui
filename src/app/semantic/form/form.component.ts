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
}
