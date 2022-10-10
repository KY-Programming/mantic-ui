import { Component } from '@angular/core';

@Component({
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridExampleComponent {
    public readonly code1 = `<m-grid>
  <m-cell size="four"></m-cell>
  <m-cell size="four"></m-cell>
  <m-cell size="four"></m-cell>
  <m-cell size="four"></m-cell>
</m-grid>`;

    public readonly code2 = `<m-grid>
  <m-cell size="four"></m-cell>
  <m-cell size="four"></m-cell>
  <m-cell size="four"></m-cell>
  <m-cell size="four"></m-cell>

  <m-cell size="two"></m-cell>
  <m-cell size="eight"></m-cell>
  <m-cell size="six"></m-cell>
</m-grid>`;

    public readonly types1 = `<m-grid>
  <m-cell></m-cell>
  <m-cell></m-cell>
  <m-cell></m-cell>
  <m-cell></m-cell>
  <m-cell></m-cell>
  <m-cell></m-cell>
  <m-cell></m-cell>
  <m-cell></m-cell>
  <m-cell></m-cell>
  <m-cell></m-cell>
  <m-cell></m-cell>
  <m-cell></m-cell>
  <m-cell></m-cell>
  <m-cell></m-cell>
  <m-cell></m-cell>
  <m-cell></m-cell>
</m-grid>`;

    public readonly types2 = `<m-grid columns="3" divided>
  <m-row>
      <m-cell></m-cell>
      <m-cell></m-cell>
      <m-cell></m-cell>
  </m-row>
  <m-row>
      <m-cell></m-cell>
      <m-cell></m-cell>
      <m-cell></m-cell>
  </m-row>
</m-grid>`;

    public readonly types3 = `<m-grid vertically divided>
  <m-row columns="2">
      <m-cell></m-cell>
      <m-cell></m-cell>
  </m-row>
  <m-row columns="3">
      <m-cell></m-cell>
      <m-cell></m-cell>
      <m-cell></m-cell>
  </m-row>
</m-grid>`;

    public readonly types4 = `<m-grid celled>
  <m-row>
      <m-cell size="3"></m-cell>
      <m-cell size="13"></m-cell>
  </m-row>
  <m-row>
      <m-cell size="3"></m-cell>
      <m-cell size="10"></m-cell>
      <m-cell size="3"></m-cell>
  </m-row>
</m-grid>`;

    public readonly types5 = `<m-grid internally celled class="colorize">
  <m-row>
      <m-cell size="3"></m-cell>
      <m-cell size="10"></m-cell>
      <m-cell size="3"></m-cell>
  </m-row>
  <m-row>
      <m-cell size="3"></m-cell>
      <m-cell size="10"></m-cell>
      <m-cell size="3"></m-cell>
  </m-row>
</m-grid>`;

    public readonly variations1 = `<m-grid>
  <m-cell float="left" size="5"></m-cell>
  <m-cell float="right" size="5"></m-cell>
</m-grid>`;

    public readonly variations2 = `<m-grid>
  <m-row columns="3">
      <m-cell></m-cell>
      <m-cell></m-cell>
      <m-cell></m-cell>
  </m-row>
  <m-row columns="4">
      <m-cell></m-cell>
      <m-cell></m-cell>
      <m-cell></m-cell>
      <m-cell></m-cell>
  </m-row>
  <m-row columns="5">
      <m-cell></m-cell>
      <m-cell></m-cell>
      <m-cell></m-cell>
      <m-cell></m-cell>
      <m-cell></m-cell>
  </m-row>
</m-grid>`;

    public readonly variations3 = `<m-grid width="equal">
  <m-cell>
      <m-segment>auto</m-segment>
  </m-cell>
  <m-cell size="8">
      <m-segment>8 wide</m-segment>
  </m-cell>
  <m-cell>
      <m-segment>auto</m-segment>
  </m-cell>
</m-grid>`;

    public readonly variations4 = `<m-grid width="equal">
  <m-row>
      <m-cell></m-cell>
      <m-cell></m-cell>
      <m-cell></m-cell>
      <m-cell></m-cell>
  </m-row>
  <m-row>
      <m-cell></m-cell>
      <m-cell></m-cell>
      <m-cell></m-cell>
  </m-row>
  <m-row>
      <m-cell></m-cell>
      <m-cell></m-cell>
  </m-row>
</m-grid>`;

    public readonly variations5 = `<m-grid columns="3" divided>
  <m-row stretched>
      <m-cell>
          <m-segment>1 of 1</m-segment>
      </m-cell>
      <m-cell>
          <m-segment>1 of 2</m-segment>
          <m-segment>2 of 2</m-segment>
      </m-cell>
      <m-cell>
          <m-segment>1 of 3</m-segment>
          <m-segment>2 of 3</m-segment>
          <m-segment>3 of 3</m-segment>
      </m-cell>
  </m-row>
</m-grid>`;

    public readonly variations6 = `<m-grid width="equal" divided>
  <m-row stretched>
      <m-cell>
          <m-segment>1 of 2</m-segment>
          <m-segment>2 of 2</m-segment>
      </m-cell>
      <m-cell size="6">
          <m-segment>
              <img src="./assets/images/image.png" height="145">
          </m-segment>
      </m-cell>
      <m-cell>
          <m-segment>1 of 2</m-segment>
          <m-segment>2 of 2</m-segment>
      </m-cell>
  </m-row>
  <m-row>
      <m-cell>
          <m-segment>1 of 2</m-segment>
          <m-segment>2 of 2</m-segment>
      </m-cell>
      <m-cell size="6">
          <m-segment>
              <img src="./assets/images/image.png" height="145">
          </m-segment>
      </m-cell>
      <m-cell>
          <m-segment>1 of 2</m-segment>
          <m-segment>2 of 2</m-segment>
      </m-cell>
  </m-row>
</m-grid>`;
}
