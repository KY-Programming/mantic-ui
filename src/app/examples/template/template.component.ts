import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent, SegmentComponent, TabComponent, TabGroupComponent, TemplateComponent, TemplateOutletComponent, TextareaComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-template',
    standalone: true,
    imports: [
        ExampleCodeComponent,
        ExampleComponent,
        HeaderComponent,
        SegmentComponent,
        TabComponent,
        TabGroupComponent,
        TextareaComponent,
        TemplateComponent,
        TemplateOutletComponent,
        ButtonComponent,
        NgIf
    ],
    templateUrl: './template.component.html',
    styleUrl: './template.component.scss'
})
export class TemplateExampleComponent {
    protected showA = false;
    protected showB = false;
    protected showC = false;

    protected readonly exampleCode = `<m-template name="my.template.id">
    This content is projected
</m-template>
<m-segment>
    <m-template-outlet name="my.template.id" />
    to here
</m-segment>`;

}
