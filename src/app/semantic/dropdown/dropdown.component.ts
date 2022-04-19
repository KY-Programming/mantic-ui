import { Component } from '@angular/core';
import { DemoData } from '../../helpers/demo-data';

@Component({
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class SemanticDropdownComponent {
  public value1: number;

  public countries = DemoData.countries;

  public code1 = `<m-dropdown placeholder="Gender" [(value)]="value1">
  <m-dropdown-item [value]="1">Male</m-dropdown-item>
  <m-dropdown-item [value]="0">Female</m-dropdown-item>
</m-dropdown>`;

  public itemsCode = `// test.component.html
<m-dropdown [items]="countries" placeholder="Select Country" fluid search></m-dropdown>

// test.component.ts
import { DropdownValue } from '@mantic-ui/angular';
...
public countries: DropdownValue<string>[] = [
  { value: 'af', text: 'Afghanistan', icon: 'af flag' },
  ...
  { value: 'zw', text: 'Zimbabwe', icon: 'zw flag' }
];`;

  public onlyTextCode = `<m-dropdown [items]="countries" [filterValue]="false" search></m-dropdown>`;
  public onlyValueCode = `<m-dropdown [items]="countries" [filterText]="false" search></m-dropdown>`;
  public containsCode = `<m-dropdown [items]="countries" filterType="contains" search></m-dropdown>`;
  public multiselectCode = `<m-dropdown [items]="countries" multiple fluid search></m-dropdown>`;
  public freetextCode = `<m-dropdown [(value)]="value" [items]="countries" fluid allowFreeText></m-dropdown>`;
  public freetextValue: string;
}
