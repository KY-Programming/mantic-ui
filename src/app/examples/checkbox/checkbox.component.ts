import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CheckboxComponent, DividerComponent, InputComponent, SegmentComponent, TabComponent, TabGroupComponent, ToggleComponent } from '@mantic-ui/angular';
import { DocIgnoreContentDirective, DocIgnoreDirective, ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';

import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-checkbox-example',
    imports: [HeaderComponent, TabGroupComponent, TabComponent, ExampleComponent, ExampleCodeComponent, CheckboxComponent, SegmentComponent, InputComponent, ToggleComponent, DividerComponent, DocIgnoreDirective, DocIgnoreContentDirective],
    templateUrl: './checkbox.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./checkbox.component.scss']
})
export class CheckboxExampleComponent {
    public standardCode = `<m-checkbox name="example">Make my profile visible</m-checkbox>`;
    public readonlyCode = `<m-checkbox readonly />`;
    public checkedCode = `<m-checkbox checked />`;
    public indeterminateCode = `<m-checkbox indeterminate />`;
    public disabledCode = `<m-checkbox disabled />`;
    public fittedCode = `<m-segment class="left floated">
    <m-checkbox fitted />
</m-segment>`;

    public bindCode = `<m-checkbox [readonly]="readonly" [(checked)]="checked" [(indeterminate)]="indeterminated" [disabled]="disabled">{{ text }}</m-checkbox>`;
    private readonlyField = false;
    private checkedField = false;
    private indeterminatedField: boolean | undefined = false;
    private disabledField = false;

    public text? = 'Label Text';

    public get readonly(): boolean {
        return this.readonlyField;
    }

    public set readonly(value: boolean) {
        this.readonlyField = value;
        this.disabledField = false;
    }

    public get checked(): boolean {
        return this.checkedField;
    }

    public set checked(value: boolean) {
        this.checkedField = value;
        this.indeterminatedField = false;
    }

    public get indeterminated(): boolean | undefined {
        return this.indeterminatedField;
    }

    public set indeterminated(value: boolean | undefined) {
        this.indeterminatedField = value;
        this.checkedField = false;
    }

    public get disabled(): boolean {
        return this.disabledField;
    }

    public set disabled(value: boolean) {
        this.disabledField = value;
        this.readonlyField = false;
    }

    public readonly inverted = `<m-segment inverted>
    <m-checkbox inverted>Inverted</m-checkbox>
</m-segment>`;
}
