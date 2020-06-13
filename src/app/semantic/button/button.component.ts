import { Component } from '@angular/core';

// tslint:disable: member-ordering
@Component({
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class SemanticButtonComponent {
  public button1Code = `<m-button>
  Follow
</m-button>`;
  public button1Text = 'Follow';
  public button1Click(): void {
    if (this.button1Text === 'Follow') {
      this.button1Text = 'Following';
    }
    else {
      this.button1Text = 'Follow';
    }
  }

  public button2Code = `<button (click)="..." m-button>
  Follow
</button>`;

  public linkButtonCode = `<a [routerLink]="['#test']" m-button>
  Go to
</a>`;

  public buttonEmphasisPrimaryCode = `<m-button primary>
  Save
</m-button>
<m-button>
  Discard
</m-button>`;

  public buttonEmphasisSecondaryCode = `<m-button secondary>
  Okay
</m-button>
<m-button>
  Cancel
</m-button>`;

  public buttonAnimatedCode = `<m-button>
  Next
  <m-animation>
    <m-icon icon="right arrow"></m-icon>
  </m-animation>
</m-button>
<m-button>
  <m-icon icon="shop"></m-icon>
  <m-animation direction="vertical">
    Shop
  </m-animation>
</m-button>
<m-button>
  Sign-up for a Pro account
  <m-animation direction="fade">
    $12.99 a month
  </m-animation>
</m-button>`;

  public buttonLabeledCode = `<m-button>
  <m-icon icon="heart"></m-icon> Like
  <ng-template #label>
    2,048
  </ng-template>
</m-button>
<m-button>
  <m-icon icon="heart"></m-icon> Like
  <m-label position="left" pointing="right">
    2,048
  </m-label>
</m-button>
<m-icon-button>
  <m-icon icon="fork"></m-icon>
  <m-label position="left">
    1,048
  </m-label>
</m-icon-button>`;

  public buttonLabeledColoredCode = `<m-button color="red" pointing="left">
  <m-icon icon="heart"></m-icon> Like
  <ng-template #label>
    1,048
  </ng-template>
</m-button>
<m-button color="blue" pointing="left" basic>
  <m-icon icon="fork"></m-icon> Forks
  <ng-template #label>
    1,048
  </ng-template>
</m-button>`;

  public bindCode = `<m-button [loading]="loading" [disabled]="disabled" [fluid]="fluid">{{text}}</m-button>`;

  public readonly states1 = `<m-button active>
  <m-icon icon="user"></m-icon>
  Follow
</m-button>`;

  public readonly states2 = `<m-button disabled>
  <m-icon icon="user"></m-icon>
  Followed
</m-button>`;

  public readonly states3 = `<m-button loading>Loading</m-button>
<m-button basic loading>Loading</m-button>
<m-button primary loading>Loading</m-button>
<m-button secondary loading>Loading</m-button>
<m-button positive loading>Loading</m-button>
<m-button negative loading>Loading</m-button>
<m-button color="purple" loading>Loading</m-button>`;

  public readonly icons = `<m-icon-button icon="cloud"></m-icon-button>
<m-icon-button icon="cloud" color="red"></m-icon-button>`;

  public readonly labeledIcon = `<m-button icon="pause">
  Pause
</m-button>
<m-button icon="right arrow" iconPosition="right">
  Next
</m-button>`;

  public readonly basic = `<m-button basic>
  <m-icon icon="user"></m-icon>
  Add Friend
</m-button>`;

  public readonly basic2 = `<m-button primary basic>Primary</m-button>
  <m-button secondary basic>Secondary</m-button>
  <m-button positive basic>Positive</m-button>
  <m-button negative basic>Negative</m-button>
  <m-icon-button icon="cloud" basic></m-icon-button>`;

  public readonly colors = `<m-button color="red" basic>Red</m-button>
  <m-button color="orange" basic>Orange</m-button>
  <m-button color="yellow" basic>Yellow</m-button>
  <m-button color="olive" basic>Olive</m-button>
  <m-button color="green" basic>Green</m-button>
  <m-button color="teal" basic>Teal</m-button>
  <m-button color="blue" basic>Blue</m-button>
  <m-button color="violet" basic>Violet</m-button>
  <m-button color="purple" basic>Purple</m-button>
  <m-button color="pink" basic>Pink</m-button>
  <m-button color="brown" basic>Brown</m-button>
  <m-button color="grey" basic>Grey</m-button>
  <m-button color="black" basic>Black</m-button>`;

  public readonly inverted = `<m-segment inverted>
  <m-button inverted>Standard</m-button>
  <m-button primary inverted>Primary</m-button>
  <m-button secondary inverted>Secondary</m-button>
  <m-button color="red" inverted>Red</m-button>
  <m-button color="orange" inverted>Orange</m-button>
  <m-button color="yellow" inverted>Yellow</m-button>
  <m-button color="olive" inverted>Olive</m-button>
  <m-button color="green" inverted>Green</m-button>
  <m-button color="teal" inverted>Teal</m-button>
  <m-button color="blue" inverted>Blue</m-button>
  <m-button color="violet" inverted>Violet</m-button>
  <m-button color="purple" inverted>Purple</m-button>
  <m-button color="pink" inverted>Pink</m-button>
  <m-button color="brown" inverted>Brown</m-button>
  <m-button color="grey" inverted>Grey</m-button>
  <m-button color="black" inverted>Black</m-button>
  <m-icon-button icon="cloud" inverted></m-icon-button>
</m-segment>`;

  public readonly invertedBasic = `<m-segment inverted>
  <m-button inverted basic>Basic</m-button>
  <m-button primary inverted basic>Primary</m-button>
  <m-button secondary inverted basic>Secondary</m-button>
  <m-button color="red" inverted basic>Red</m-button>
  <m-button color="orange" inverted basic>Orange</m-button>
  <m-button color="yellow" inverted basic>Yellow</m-button>
  <m-button color="olive" inverted basic>Olive</m-button>
  <m-button color="green" inverted basic>Green</m-button>
  <m-button color="teal" inverted basic>Teal</m-button>
  <m-button color="blue" inverted basic>Blue</m-button>
  <m-button color="violet" inverted basic>Violet</m-button>
  <m-button color="purple" inverted basic>Purple</m-button>
  <m-button color="pink" inverted basic>Pink</m-button>
  <m-button color="brown" inverted basic>Brown</m-button>
  <m-button color="grey" inverted basic>Grey</m-button>
  <m-button color="black" inverted basic>Black</m-button>
  <m-icon-button icon="cloud" inverted basic></m-icon-button>
</m-segment>`;

  public readonly social = `<m-button social="Facebook"></m-button>
  <m-button social="Twitter"></m-button>
  <m-button social="Google Plus"></m-button>
  <m-button social="VK"></m-button>
  <m-button social="LinkedIn"></m-button>
  <m-button social="Instagram"></m-button>
  <m-button social="YouTube"></m-button>`;

  public readonly size = `<m-button size="mini">Mini</m-button>
  <m-button size="tiny">Tiny</m-button>
  <m-button size="small">Small</m-button>
  <m-button size="medium">Medium</m-button>
  <m-button size="large">Large</m-button>
  <m-button size="big">Big</m-button>
  <m-button size="huge">Huge</m-button>
  <m-button size="massive">Massive</m-button>`;

  public readonly colored = `<m-button color="red">Red</m-button>
  <m-button color="orange">Orange</m-button>
  <m-button color="yellow">Yellow</m-button>
  <m-button color="olive">Olive</m-button>
  <m-button color="green">Green</m-button>
  <m-button color="teal">Teal</m-button>
  <m-button color="blue">Blue</m-button>
  <m-button color="violet">Violet</m-button>
  <m-button color="purple">Purple</m-button>
  <m-button color="pink">Pink</m-button>
  <m-button color="brown">Brown</m-button>
  <m-button color="grey">Grey</m-button>
  <m-button color="black">Black</m-button>`;

  public readonly compact = `<m-button size="compact">Hold</m-button>
  <m-icon-button size="compact" icon="pause"></m-icon-button>
  <m-button size="compact" icon="pause">
      Pause
  </m-button>`;

  public readonly toggle = `<m-toggle-button>
  Vote
  <ng-template #active>
      Voted
  </ng-template>
</m-toggle-button>`;

  public readonly positive = `<m-button positive>Positive Button</m-button>`;
  public readonly negative = `<m-button negative>Negative Button</m-button>`;
  public readonly fluid2 = `<m-button class="fluid">Fits container</m-button>`;
  public readonly circular = `<m-icon-button class="circular" icon="settings"></m-icon-button>`;

  public readonly socialCircular = `<m-icon-button class="circular" social="facebook"></m-icon-button>
  <m-icon-button class="circular" social="twitter"></m-icon-button>
  <m-icon-button class="circular" social="google plus"></m-icon-button>
  <m-icon-button class="circular" social="vk"></m-icon-button>
  <m-icon-button class="circular" social="linkedin"></m-icon-button>
  <m-icon-button class="circular" social="instagram"></m-icon-button>
  <m-icon-button class="circular" social="youtube"></m-icon-button>`;

  public readonly verticallyAttached = `<m-button class="top attached">Top</m-button>
  <m-segment class="attached">
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
          clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
          consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
          sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
  </m-segment>
  <m-button class="bottom attached">Bottom</m-button>`;

  public readonly verticallyAttached2 = `<m-button-group class="two top attached">
  <m-button>One</m-button>
  <m-button>Two</m-button>
</m-button-group>
<m-segment class="attached">
  <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
      dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
      consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
      sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
      sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
</m-segment>
<m-button-group class="two bottom attached">
  <m-button>One</m-button>
  <m-button>Two</m-button>
</m-button-group>`;

  public readonly groups1 = `<m-button-group>
  <m-button>One</m-button>
  <m-button>Two</m-button>
  <m-button>Three</m-button>
</m-button-group>`;

  public readonly groups2 = `<m-button-group>
  <m-icon-button icon="align left"></m-icon-button>
  <m-icon-button icon="align center"></m-icon-button>
  <m-icon-button icon="align right"></m-icon-button>
  <m-icon-button icon="align justify"></m-icon-button>
</m-button-group>
<m-button-group>
  <m-icon-button icon="bold"></m-icon-button>
  <m-icon-button icon="underline"></m-icon-button>
  <m-icon-button icon="text width"></m-icon-button>
</m-button-group>`;

  public readonly groups3 = `<m-button-group>
  <m-button>Cancel</m-button>
  <m-or></m-or>
  <m-button positive>Save</m-button>
</m-button-group>`;

  public readonly groups4 = `<m-button-group>
  <m-button>un</m-button>
  <m-or data-text="ou"></m-or>
  <m-button positive>deux</m-button>
</m-button-group>`;

  public readonly groups5 = `<m-button-group class="vertical">
  <m-button>Feed</m-button>
  <m-button>Messages</m-button>
  <m-button>Events</m-button>
  <m-button>Photos</m-button>
</m-button-group>`;

  public readonly groups6 = `<m-button-group>
  <m-icon-button icon="play"></m-icon-button>
  <m-icon-button icon="pause"></m-icon-button>
  <m-icon-button icon="shuffle"></m-icon-button>
</m-button-group>`;

  public readonly groups7 = `<m-button-group class="vertical">
  <m-button icon="pause">Pause</m-button>
  <m-button icon="play">Play</m-button>
  <m-button icon="shuffle">Shuffle</m-button>
</m-button-group>`;

  public readonly groups8 = `<m-button-group>
  <m-button icon="left chevron">Back</m-button>
  <m-button>
      <m-icon icon="stop"></m-icon>
      Stop
  </m-button>
  <m-button icon="right chevron" iconPosition="right">Forward</m-button>
</m-button-group>`;

  public readonly groups9 = `<m-button-group class="five">
  <m-button>Overview</m-button>
  <m-button>Specs</m-button>
  <m-button>Warranty</m-button>
  <m-button>Reviews</m-button>
  <m-button>Support</m-button>
</m-button-group>
<m-divider></m-divider>
<m-button-group class="three">
  <m-button>Overview</m-button>
  <m-button>Specs</m-button>
  <m-button>Support</m-button>
</m-button-group>`;

  public readonly groups10 = `<m-button-group class="blue">
  <m-button>One</m-button>
  <m-button>Two</m-button>
  <m-button>Three</m-button>
</m-button-group>`;

  public readonly groups11 = `<m-button-group class="basic">
  <m-button>One</m-button>
  <m-button>Two</m-button>
  <m-button>Three</m-button>
</m-button-group>
<m-divider></m-divider>
<m-button-group class="basic vertical">
  <m-button>One</m-button>
  <m-button>Two</m-button>
  <m-button>Three</m-button>
</m-button-group>`;

  public readonly groups12 = `<m-button-group>
  <m-button color="red" basic>One</m-button>
  <m-button color="blue" basic>Two</m-button>
  <m-button color="green" basic>Three</m-button>
</m-button-group>`;

  public readonly groups13 = `<m-button-group class="large">
  <m-button>One</m-button>
  <m-button>Two</m-button>
  <m-button>Three</m-button>
</m-button-group>`;

  public readonly groups14 = `<m-button-group class="small basic">
  <m-icon-button icon="file"></m-icon-button>
  <m-icon-button icon="save"></m-icon-button>
  <m-icon-button icon="upload"></m-icon-button>
  <m-icon-button icon="download"></m-icon-button>
</m-button-group>`;

  public readonly groups15 = `<m-button-group class="large">
  <m-button>One</m-button>
  <m-or></m-or>
  <m-button>Two</m-button>
</m-button-group>`;

  private loadingValue = false;
  private disabledValue = false;

  public text = 'Click Me';

  public get loading(): boolean {
    return this.loadingValue;
  }
  public set loading(value: boolean) {
    this.reset();
    this.loadingValue = value;
  }

  public get disabled(): boolean {
    return this.disabledValue;
  }
  public set disabled(value: boolean) {
    this.reset();
    this.disabledValue = value;
  }

  public fluid: boolean;

  private reset(): void {
    this.loadingValue = false;
    this.disabledValue = false;
  }

  public eventMessage: string;
  public eventCode = `<m-button (click)="eventClick()">Click me</m-button>`;
  public eventClick(): void {
    this.eventMessage = 'Button was clicked';
    setTimeout(() => this.eventMessage = undefined, 2000);
  }
}
