import { Component } from '@angular/core';

@Component({
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class SemanticModalComponent {

  public showModal = false;
  public showDefault = false;
  public showBasic = false;
  public showHiddenClose = false;

  public standardCode = `<m-button (click)="showModal = true">Open</m-button>
<m-modal *ngIf="showModal" (close)="showModal = false" imageContent>
  <m-modal-header>
    <m-icon icon="question"></m-icon> Profile Picture
  </m-modal-header>
  <div class="ui medium image">
    <img>
  </div>
  <div class="description">
    <div class="ui header">We've auto-chosen a profile image for you.</div>
    <p>We've grabbed the following image from the <a href="https://www.gravatar.com" target="_blank">gravatar</a> image associated with your registered e-mail address.</p>
    <p>Is it okay to use this photo?</p>
  </div>
  <m-modal-footer>
    <m-button color="black">Nope</m-button>
    <m-button icon="checkmark" labelPosition="right" primary>Yep, that's me</m-button>
  </m-modal-footer>
</m-modal>`;

  public defaultCode = `<m-button (click)="showModal = true">Open</m-button>
<m-modal *ngIf="showModal" header="Some header" (close)="showModal = false">
  Some content
</m-modal>`;

  public textHeaderCode = `<m-modal header="Some header"></m-modal>`;
  public templatedHeaderCode = `<m-modal>
  <m-modal-header>
    <m-icon icon="question"></m-icon> Profile Picture
  </m-modal-header>
</m-modal>`;
}
