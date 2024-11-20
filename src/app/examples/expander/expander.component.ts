import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent, ExpanderComponent, ExpanderIconComponent, HeaderDirective, IconComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-expander-example',
    imports: [CommonModule, HeaderComponent, TabGroupComponent, TabComponent, ExampleComponent, ExampleCodeComponent, ExpanderComponent, ButtonComponent, ExpanderIconComponent],
    templateUrl: './expander.component.html',
    styleUrls: ['./expander.component.scss']
})
export class ExpanderExampleComponent {
    public readonly code1 = `<m-expander header="A header">Content goes here</m-expander>`;
    public readonly code2 = `<m-expander header="A header" expanded>Content goes here</m-expander>`;
    public isExpanded = false;
    public expanderCode = `<m-expander-icon [expanded]="isExpanded"></m-expander-icon>`;
    protected readonly iconRightCode = `<m-expander iconPosition="right" header="A header">Content goes here</m-expander>`;

}
