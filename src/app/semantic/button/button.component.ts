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
