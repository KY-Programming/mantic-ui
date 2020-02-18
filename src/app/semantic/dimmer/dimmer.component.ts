import { Component } from '@angular/core';

@Component({
  templateUrl: './dimmer.component.html',
  styleUrls: ['./dimmer.component.scss']
})
export class SemanticDimmerComponent {
  public dim1: boolean;
  public dim2: boolean;
  public dim3: boolean;

  public simpleCode = `<m-segment dimmable>
  <h3 m-header>Overlayable Section</h3>
  <div class="ui small images">
      <img>
      <img>
      <img>
  </div>
  <p></p>
  <m-dimmer *ngIf="showDimmer" (click)="showDimmer = false"></m-dimmer>
</m-segment>`;

  public contentCode = `<m-segment dimmable>
  <h3 m-header>Overlayable Section</h3>
  <div class="ui small images">
      <img>
      <img>
      <img>
  </div>
  <p></p>
  <m-dimmer *ngIf="showDimmer" (click)="showDimmer = false">
    <h2 m-header inverted icon>
      <m-icon icon="heart"></m-icon>
      Dimmed Message!
    </h2>
  </m-dimmer>
</m-segment>`;

  public pageCode = `<m-dimmer *ngIf="showDimmer" (click)="showDimmer = false" page>
  <h2 m-header inverted icon>
    <m-icon icon="mail"></m-icon>
    Dimmer Message
    <div class="sub header">Dimmer sub-header</div>
  </h2>
</m-dimmer>`;
}
