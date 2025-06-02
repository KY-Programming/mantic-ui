import { Component } from '@angular/core';

import { HeaderComponent } from '../../components/header/header.component';
import { ButtonComponent, HeaderDirective, IconComponent, SegmentComponent, SegmentGroupComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';

@Component({
    selector: 'app-segment-example',
    imports: [HeaderComponent, TabGroupComponent, TabComponent, IconComponent, ExampleComponent, ExampleCodeComponent, SegmentComponent, ButtonComponent, SegmentGroupComponent],
    templateUrl: './segment.component.html',
    styleUrls: ['./segment.component.scss']
})
export class SegmentExampleComponent {
    public code1 = `<m-segment></m-segment>`;
    public raisedCode = `<m-segment raised></m-segment>`;
    public invertedCode = `<m-segment inverted></m-segment>`;
    public coloredCode = `<m-segment color="red"></m-segment>`;
    public loadingCode = `<m-segment loading></m-segment>`;
    public basicCode = `<m-segment basic></m-segment>`;

    public groupCode = `<m-segment-group>
  <m-segment>
    Top
  </m-segment>
  <m-segment>
    Middle
  </m-segment>
  <m-segment>
    Middle
  </m-segment>
  <m-segment>
    Middle
  </m-segment>
  <m-segment>
    Bottom
  </m-segment>
</m-segment-group>`;

    public coloredGroupCode = `<m-segment-group>
  <m-segment>
    Top
  </m-segment>
  <m-segment color="red">
    Middle
  </m-segment>
  <m-segment color="blue">
    Middle
  </m-segment>
  <m-segment color="green">
    Middle
  </m-segment>
  <m-segment color="yellow">
    Bottom
  </m-segment>
</m-segment-group>`;

    public secondaryGroupCode = `<m-segment-group>
  <m-segment>
    Top
  </m-segment>
  <m-segment secondary>
    Secondary Content
  </m-segment>
</m-segment-group>`;
}
