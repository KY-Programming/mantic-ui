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

  public buttonEmphasisPrimaryCode = `<m-button [primary]="true">
  Save
</m-button>
<m-button>
  Discard
</m-button>`;

  public buttonEmphasisSecondaryCode = `<m-button [secondary]="true">
  Okay
</m-button>
<m-button>
  Cancel
</m-button>`;

  public buttonAnimatedCode = `<m-button>
  Next
  <ng-template #animated>
    <m-icon icon="right arrow"></m-icon>
  </ng-template>
</m-button>
<m-button animation="vertical">
  <m-icon icon="shop"></m-icon>
  <ng-template #animated>
    Shop
  </ng-template>
</m-button>
<m-button animation="fade">
  Sign-up for a Pro account
  <ng-template #animated>
    $12.99 a month
  </ng-template>
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
<m-button labelPosition="left" [iconOnly]="true">
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
<m-button color="blue" pointing="left" [basic]="true">
  <m-icon icon="fork"></m-icon> Forks
  <ng-template #label>
    1,048
  </ng-template>
</m-button>`;

}
