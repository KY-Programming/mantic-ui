import { Component } from '@angular/core';
import { CheckboxComponent, FieldComponent, FlexComponent, FormComponent, InputComponent, SegmentComponent, SubmitComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-flex',
    standalone: true,
    imports: [
        CheckboxComponent,
        ExampleCodeComponent,
        ExampleComponent,
        FieldComponent,
        FormComponent,
        HeaderComponent,
        InputComponent,
        SubmitComponent,
        TabComponent,
        TabGroupComponent,
        FlexComponent,
        SegmentComponent
    ],
    templateUrl: './flex.component.html',
    styleUrl: './flex.component.scss'
})
export class FlexExampleComponent {
    public code1 = `<m-flex>
    <m-segment>1</m-segment>
    <m-segment>2</m-segment>
    <m-segment>3</m-segment>
</m-flex>`;

    public code2 = `<m-flex direction="column">
    <m-segment>1</m-segment>
    <m-segment>2</m-segment>
    <m-segment>3</m-segment>
</m-flex>`;

    public codeVariation1 = `<m-flex gap="1rem">
    <m-segment>1</m-segment>
    <m-segment>2</m-segment>
    <m-segment>3</m-segment>
</m-flex>`;

}
