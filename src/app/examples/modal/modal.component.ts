import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { faRocket } from '@fortawesome/pro-solid-svg-icons';
import { ArrayPipe, ButtonComponent, DropdownComponent, DropdownItemComponent, FlexComponent, HeaderDirective, IconComponent, ModalComponent, ModalDefaultsComponent, ModalFooterComponent, ModalHeaderComponent, ModalSize, TabComponent, TabGroupComponent, ToBodyDirective } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-modal-example',
    imports: [CommonModule, HeaderComponent, TabGroupComponent, TabComponent, IconComponent, HeaderDirective, ExampleComponent, ExampleCodeComponent, ButtonComponent, ModalComponent, ModalHeaderComponent, ModalFooterComponent, ToBodyDirective, DropdownComponent, DropdownItemComponent, ModalDefaultsComponent, ArrayPipe, FlexComponent],
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalExampleComponent {
    public showModal = false;
    public showDefault = false;
    public showBasic = false;
    public showHiddenClose = false;
    public showFullscreen = false;
    public showBody = false;
    public showNoPadding = false;
    public showSize = false;
    public size: ModalSize = 'mini';
    public showScrolling = false;
    public showChangeIcon = false;
    public showInverted = false;
    public showLoading = false;
    public showWithoutHeader = false;
    public showWithoutFooter = false;
    public showWithoutDimmer = false;
    public showWithClose = false;
    public showGrowOnly = false;
    protected growOnlyRows = 0;
    protected readonly faRocket = faRocket;

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
    <m-button color="black" (click)="showModal = false">Nope</m-button>
    <m-button icon="checkmark" iconPosition="right" primary (click)="showModal = false">Yep, that's me</m-button>
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

    public contentCode = `<m-modal>
  <p></p>
</m-modal>`;

    public imageContentCode = `<m-modal imageContent>
  <img class="image">
  <div class="description">
    <p></p>
  </div>
</m-modal>`;

    public actionsCode = `<m-modal>
  <m-modal-footer>
    <p>Ask a question?</p>
    <m-button (click)="onNope()">Nope</m-button>
    <m-button primary (click)="onYep()">Yep</m-button>
  </m-modal-footer>
</m-modal>`;

    public fullscreenCode = `<m-modal fullscreen></m-modal>`;
    public bodyCode = `<m-modal *m-to-body></m-modal>`;
    public noPaddingCode = `<m-modal noPadding></m-modal>`;

    public sizeCode = `// test.component.html
<m-modal [size]="size">
  <m-dropdown [(value)]="size">
    <m-dropdown-item [value]="undefined">Default</m-dropdown-item>
    <m-dropdown-item value="mini">Mini</m-dropdown-item>
    <m-dropdown-item value="tiny">Tiny</m-dropdown-item>
    <m-dropdown-item value="small">Small</m-dropdown-item>
    <m-dropdown-item value="large">Large</m-dropdown-item>
  </m-dropdown>
</m-modal>

// test.component.ts
import { ModalSize } from '@mantic-ui/angular';

public size: ModalSize = 'mini';`;
    public readonly changeIconCode = `<!-- Place the next line anywhere global like on your app.component.html -->
<m-modal-defaults [closeIcon]="faRocket"></m-modal-defaults>
<m-modal>...</m-modal>`;

    protected invertedCode = `<m-modal inverted />`;
    protected loadingCode = `<m-modal [loading]="isLoading" />`;
    protected hideHeaderCode = `<m-modal hideHeader />`;
    protected hideFooterCode = `<m-modal hideFooter />`;
    protected hideDimmerCode = `<m-modal hideDimmer />`;
    protected showCloseCode = `<m-modal showClose />`;
    protected growOnlyCode = `<m-modal growOnly />`;

    protected grow(): void {
        this.growOnlyRows++;
    }

    protected shrink(): void {
        this.growOnlyRows--;
    }
}
