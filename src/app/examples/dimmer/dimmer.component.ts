import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { ButtonComponent, DimmerComponent, HeaderDirective, IconComponent, SegmentComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';

@Component({
    selector: 'app-dimmer-example',
    standalone: true,
    imports: [CommonModule, HeaderComponent, TabGroupComponent, TabComponent, IconComponent, HeaderDirective, ExampleComponent, ExampleCodeComponent, SegmentComponent, DimmerComponent, ButtonComponent],
    templateUrl: './dimmer.component.html',
    styleUrls: ['./dimmer.component.scss']
})
export class DimmerExampleComponent {
    public dim1 = false;
    public dim2 = false;
    public dim3 = false;

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
