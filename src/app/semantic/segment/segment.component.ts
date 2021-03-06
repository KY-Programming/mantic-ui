import { Component } from '@angular/core';

@Component({
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss']
})
export class SemanticSegmentComponent {
  public code1 = `<m-segment>...</m-segment>`;
  public code3 = `<m-segment raised>...</m-segment>`;

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
