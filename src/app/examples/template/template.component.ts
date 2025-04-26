import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent, HideOnEmptyTemplateDirective, SegmentComponent, TabComponent, TabGroupComponent, TemplateComponent, TemplateOutletComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-template',
    imports: [ExampleCodeComponent, ExampleComponent, HeaderComponent, SegmentComponent, TabComponent, TabGroupComponent, TemplateComponent, TemplateOutletComponent, ButtonComponent, NgIf, HideOnEmptyTemplateDirective],
    templateUrl: './template.component.html',
    styleUrl: './template.component.scss'
})
export class TemplateExampleComponent {
    protected showA = false;
    protected showB = false;
    protected showC = false;
    protected visible = false;

    protected readonly code1 = `<m-template name="my.template.id">
    This content is projected
</m-template>
<m-segment>
    <m-template-outlet name="my.template.id" />
    to here
</m-segment>`;

    protected readonly code2 = `<m-button *ngIf="!showA" primary (click)="showA = true">Show A</m-button>
<m-button *ngIf="showA" primary (click)="showA = false">Hide A</m-button>
<m-template *ngIf="showA" name="stacked-templates">A is the best.</m-template>
<m-button *ngIf="!showB" secondary (click)="showB = true">Show B</m-button>
<m-button *ngIf="showB" secondary (click)="showB = false">Hide B</m-button>
<m-template *ngIf="showB" name="stacked-templates">B is even better!</m-template>
<m-button *ngIf="!showC" positive (click)="showC = true">Show C</m-button>
<m-button *ngIf="showC" positive (click)="showC = false">Hide C</m-button>
<m-template *ngIf="showC" name="stacked-templates">C is the is the bestestestest!!1!!</m-template>
<m-template name="stacked-templates">No result available. Press a button</m-template>
<m-segment>
    <div>Result:</div>
    <m-template-outlet name="stacked-templates" />
</m-segment>`;

    protected readonly code3 = `<m-button *ngIf="!visible" primary (click)="visible = true">Show</m-button>
<m-button *ngIf="visible" primary (click)="visible = false">Hide</m-button>
<m-template *ngIf="visible" name="onlyFilledTemplates">
    This content is projected and also hides it wrapping m-segment
</m-template>
<m-segment *mHideOnEmptyTemplate="'onlyFilledTemplates'">
    <m-template-outlet name="onlyFilledTemplates" />
</m-segment>`;

}
