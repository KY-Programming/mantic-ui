import { Component } from '@angular/core';

@Component({
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class SemanticGridComponent {
  public code1 = `<m-grid>
  <m-cell size="four"></m-cell>
  <m-cell size="four"></m-cell>
  <m-cell size="four"></m-cell>
  <m-cell size="four"></m-cell>
</m-grid>`;

  public code2 = `<m-grid>
  <m-cell size="four"></m-cell>
  <m-cell size="four"></m-cell>
  <m-cell size="four"></m-cell>
  <m-cell size="four"></m-cell>

  <m-cell size="two"></m-cell>
  <m-cell size="eight"></m-cell>
  <m-cell size="six"></m-cell>
</m-grid>`;
}
