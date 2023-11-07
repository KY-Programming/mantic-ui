import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRocket } from '@fortawesome/pro-solid-svg-icons';
import { HeaderDirective, IconComponent, LabelComponent, TabComponent, TabGroupComponent, TableComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-icon-example',
    standalone: true,
    imports: [CommonModule, HeaderComponent, TabGroupComponent, TabComponent, IconComponent, HeaderDirective, ExampleComponent, ExampleCodeComponent, FontAwesomeModule, TableComponent, LabelComponent],
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss']
})
export class IconExampleComponent {
    public readonly faRocket = faRocket;

    public readonly mIconCode = `<m-icon icon="rocket" />`;
    public readonly faIconHtml = `<fa-icon [icon]="faRocket" />`;
    public readonly faIconCode = `import { faRocket } from '@fortawesome/pro-solid-svg-icons';
// import { faRocket } from '@fortawesome/free-solid-svg-icons';

@Component({...})
export class MyComponent {
    protected readonly faRocket = faRocket;
}`;

    public semanticUiHtml = `<m-semantic-ui-icons-local />`;

    public fontawesomeHtml = `<m-modal-defaults [closeIcon]="faXmark" />
<m-chat-defaults [sendIcon]="faPaperPlaneTop" />
<m-expander-defaults [dropdownIcon]="faCaretRight" />
<m-label-dropdown-defaults [dropdownIcon]="faCaretDown" />
<m-layout-defaults [menuIcon]="faBars"></m-layout-defaults>
<m-dropdown-defaults [dropdownIcon]="faCaretDown" [deleteIcon]="faXmark" />
<m-message-defaults [closeIcon]="faXmark" />
<m-checkbox-defaults [checkIcon]="faCheck" checkIconSize="1x" [indeterminateIcon]="faMinus" />
<m-field-defaults [hintIcon]="faCircleInfo" [errorIcon]="faExclamationCircle" />
<m-notification-defaults [sucessIcon]="faCheck"/>`;

    public fontawesomeTs = `import { faBars, faCaretDown, faCaretRight, faCheck, faCircleInfo, faExclamationCircle, faMinus, faPaperPlaneTop, faXmark } from '@fortawesome/pro-solid-svg-icons';
import { ChatDefaultsComponent, CheckboxDefaultsComponent, DropdownDefaultsComponent, ExpanderDefaultsComponent, FieldDefaultsComponent, LabelDropdownDefaultsComponent, LayoutDefaultsComponent, MessageDefaultsComponent, ModalDefaultsComponent, SegmentComponent, ThemeService } from '@mantic-ui/angular';

@Component({...})
export class AppComponent {
    protected readonly faPaperPlaneTop = faPaperPlaneTop;
    protected readonly faCaretDown = faCaretDown;
    protected readonly faCaretRight = faCaretRight;
    protected readonly faBars = faBars;
    protected readonly faXmark = faXmark;
    protected readonly faCheck = faCheck;
    protected readonly faMinus = faMinus;
    protected readonly faCircleInfo = faCircleInfo;
    protected readonly faExclamationCircle = faExclamationCircle;
}`;
}
