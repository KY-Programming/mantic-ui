import { Component } from '@angular/core';
import { DemoData } from '../../helpers/demo-data';
import { CommonModule } from '@angular/common';
import { DividerComponent, DropdownComponent, DropdownGroupComponent, DropdownItemComponent, HeaderDirective, IconComponent, SegmentComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-dropdown-example',
    standalone: true,
    imports: [CommonModule, HeaderComponent, TabGroupComponent, TabComponent, IconComponent, HeaderDirective, ExampleComponent, ExampleCodeComponent, DropdownComponent, DropdownItemComponent, DropdownGroupComponent, HeaderComponent, SegmentComponent, DividerComponent],
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownExampleComponent {
    public value1?: number;

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
    public freetextValue?: string;

    public dividerCode = `<m-dropdown selectFirst>
    <m-dropdown-item value="1">One</m-dropdown-item>
    <m-dropdown-item value="2">Two</m-dropdown-item>
    <m-divider></m-divider>
    <m-dropdown-item value="3">Three</m-dropdown-item>
    <m-dropdown-item value="4">Four</m-dropdown-item>
    <m-dropdown-item value="5">Five</m-dropdown-item>
</m-dropdown>`;

    public headerCode = `<m-dropdown selectFirst>
    <m-header icon="tags">Filter by tags</m-header>
    <m-dropdown-item value="1">One</m-dropdown-item>
    <m-dropdown-item value="2">Two</m-dropdown-item>
    <m-dropdown-item value="3">Three</m-dropdown-item>
    <m-dropdown-item value="4">Four</m-dropdown-item>
    <m-dropdown-item value="5">Five</m-dropdown-item>
</m-dropdown>`;

    public groupCode = `<m-dropdown selectFirst>
    <m-dropdown-group icon="check" label="Checked">
        <m-dropdown-item value="1">One</m-dropdown-item>
        <m-dropdown-item value="2">Two</m-dropdown-item>
    </m-dropdown-group>
    <m-dropdown-group icon="tags" label="Tags">
        <m-dropdown-item value="3">Three</m-dropdown-item>
        <m-dropdown-item value="4">Four</m-dropdown-item>
        <m-dropdown-item value="5">Five</m-dropdown-item>
    </m-dropdown-group>
</m-dropdown>`;

    public readonly inverted = `<m-dropdown inverted></m-dropdown>`;
}
