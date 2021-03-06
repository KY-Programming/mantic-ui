import { Component } from '@angular/core';

// tslint:disable: member-ordering
@Component({
  selector: 'app-semantic-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class FomanticButtonComponent {
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
<m-button animation="vertical">
  <m-icon icon="shop"></m-icon>
  <m-animation>
    Shop
  </m-animation>
</m-button>
<m-button animation="fade">
  Sign-up for a Pro account
  <m-animation>
    $12.99 a month
  </m-animation>
</m-button>`;

  public buttonLabeledCode = `<m-button>
  <m-icon icon="heart"></m-icon> Like
  <ng-template #label>
    2,048
  </ng-template>
</m-button>
<m-button labelPosition="left" pointing="right">
  <m-icon icon="heart"></m-icon> Like
  <ng-template #label>
    2,048
  </ng-template>
</m-button>
<m-button labelPosition="left" iconOnly>
  <m-icon icon="fork"></m-icon>
  <ng-template #label>
    1,048
  </ng-template>
</m-button>`;

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

}
