import { Component } from '@angular/core';

@Component({
    selector: 'app-tab-example',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss']
})
export class TabExampleComponent {
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

    public readonly scrollableCode = `<m-tab-group scrollable></m-tab-group>`;
    public readonly invertedCode = `<m-tab-group inverted></m-tab-group>`;

    public menuBottom = `<m-tab-group menu="bottom"></m-tab-group>`;
    public menuLeft = `<m-tab-group menu="left"></m-tab-group>`;
    public menuRight = `<m-tab-group menu="right"></m-tab-group>`;
    public loadingCode = `<m-tab-group loading></m-tab-group>`;
}
