import { Component } from '@angular/core';

@Component({
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class SemanticTabComponent {
  public selectedTab = 1;

  public code1 = `<m-tab-group>
  <m-tab label="Tab"></m-tab>
</m-tab-group>`;

  public code2 = `<m-tab-group>
  <m-tab label="Bio"></m-tab>
  <m-tab label="Photos" active></m-tab>
</m-tab-group>`;

  public selectedIndexCode = `<m-tab-group [(selectedIndex)]="selectedTab">
  <m-tab></m-tab>
  <m-tab></m-tab>
  <m-tab></m-tab>
</m-tab-group>`;
}
