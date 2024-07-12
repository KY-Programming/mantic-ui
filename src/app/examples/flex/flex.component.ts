import { Component } from '@angular/core';
import { CheckboxComponent, FieldComponent, FillDirective, FlexComponent, FlexDirective, FormComponent, InputComponent, SegmentComponent, SubmitComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
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
        SegmentComponent,
        FlexDirective,
        FillDirective
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
    public code1Alt = `<div m-flex>
    <m-segment>1</m-segment>
    <m-segment>2</m-segment>
    <m-segment>3</m-segment>
</div>`;

    public code2 = `<m-flex column>
    <m-segment>1</m-segment>
    <m-segment>2</m-segment>
    <m-segment>3</m-segment>
</m-flex>`;

    public code2Alt = `<div m-flex column>
    <m-segment>1</m-segment>
    <m-segment>2</m-segment>
    <m-segment>3</m-segment>
</div>`;

    public code3 = `<m-flex>
    <m-segment noMargin>1</m-segment>
    <m-segment m-fill noMargin>2</m-segment>
    <m-segment noMargin>3</m-segment>
</m-flex>`;

    public code4 = `<m-flex>
    <div>1</div>
    <m-fill>2</m-fill>
    <div>3</div>
</m-flex>`;

    public codeVariation1 = `<m-flex gap="1rem">
    <m-segment>1</m-segment>
    <m-segment>2</m-segment>
    <m-segment>3</m-segment>
</m-flex>`;

}
