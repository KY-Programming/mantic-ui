import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class SemanticDropdownComponent {
  public value1: number;

  public code1 = `<m-dropdown placeholder="Gender" [(value)]="value1">
  <m-dropdown-item [value]="1">Male</m-dropdown-item>
  <m-dropdown-item [value]="0">Female</m-dropdown-item>
</m-dropdown>`;

}
