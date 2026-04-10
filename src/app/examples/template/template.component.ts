import { Component, signal } from '@angular/core';
import { ButtonComponent, FlexComponent, HideOnEmptyTemplateDirective, SegmentComponent, TabComponent, TabGroupComponent, TemplateComponent, TemplateOutletComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-template',
    imports: [ExampleCodeComponent, ExampleComponent, HeaderComponent, SegmentComponent, TabComponent, TabGroupComponent, TemplateComponent, TemplateOutletComponent, ButtonComponent, HideOnEmptyTemplateDirective, FlexComponent],
    templateUrl: './template.component.html',
    styleUrl: './template.component.scss'
})
export class TemplateExampleComponent {
    protected readonly showB = signal(false);
    protected readonly showC = signal(false);

    protected readonly code1 = `<m-template name="my.template.id">
    This content is projected
</m-template>
<m-segment>
    <m-template-outlet name="my.template.id" />
    to here
</m-segment>`;

    protected readonly code2 = `<!-- A uses template methods and is per default hidden. -->
<!-- It gets hidden when other templates are shown. That allows bring A in front via button. -->
<m-button primary (click)="templateA.toggle()">
    {{ templateA.visible() ? 'Hide' : 'Show' }} A
</m-button>
<m-template name="stacked-templates" hidden autoHide #templateA>A is the best.</m-template>

<!-- B uses a local signal bound to template's visible property -->
<!-- It gets also hidden when other templates are shown. That allows bring B in front via button. -->
@if (showB()) {
    <m-button secondary (click)="showB.set(false)">Hide B</m-button>
} @else {
    <m-button secondary (click)="showB.set(true)">Show B</m-button>
}
<m-template name="stacked-templates" [(visible)]="showB" autoHide>B is even better!</m-template>

<!-- C uses a local signal and shows/hides the template via @if. -->
<!-- But button state does not change when other templates are in front. -->
<!-- So all other templates has to hide, to make C visible again. -->
@if (showC()) {
    <m-button positive (click)="showC.set(false)">Hide C</m-button>
    <m-template name="stacked-templates">C is the bestestestest!!1!!</m-template>
} @else {
    <m-button positive (click)="showC.set(true)">Show C</m-button>
}

<!-- Fallback template is always visible. So it recovers its visible state when the outlet is empty -->
<m-template name="stacked-templates">No result available. Press a button</m-template>

<!-- Projection target -->
<m-segment>
    <div>Result:</div>
    <m-template-outlet name="stacked-templates" />
</m-segment>`;

    protected readonly code3 = `<m-button primary (click)="onlyFilledTemplates.toggle()">Toggle</m-button>
<m-template name="onlyFilledTemplates" #onlyFilledTemplates>
    This content is projected and also hides it wrapping m-segment
</m-template>
<m-segment *mHideOnEmptyTemplate="'onlyFilledTemplates'">
    <m-template-outlet name="onlyFilledTemplates" />
</m-segment>`;

}
