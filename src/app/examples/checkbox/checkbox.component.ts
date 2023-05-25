import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { CheckboxComponent, DividerComponent, HeaderDirective, IconComponent, InputComponent, SegmentComponent, TabComponent, TabGroupComponent, ToggleComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';

@Component({
    selector: 'app-checkbox-example',
    standalone: true,
    imports: [CommonModule, HeaderComponent, TabGroupComponent, TabComponent, IconComponent, HeaderDirective, ExampleComponent, ExampleCodeComponent, CheckboxComponent, SegmentComponent, InputComponent, ToggleComponent, DividerComponent],
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss']
})
export class CheckboxExampleComponent {
    public standardCode = `<m-checkbox name="example">Make my profile visible</m-checkbox>`;
    public readonlyCode = `<m-checkbox readonly></m-checkbox>`;
    public checkedCode = `<m-checkbox checked></m-checkbox>`;
    public indeterminateCode = `<m-checkbox indeterminate></m-checkbox>`;
    public disabledCode = `<m-checkbox disabled></m-checkbox>`;
    public fittedCode = `<m-checkbox fitted></m-checkbox>`;

    public bindCode = `<m-checkbox [readonly]="readonly" [checked]="checked" [indeterminate]="indeterminated" [disabled]="disabled">{{text}}</m-checkbox>`;
    private readonlyField = false;
    private checkedField = false;
    private indeterminatedField = false;
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

    public get indeterminated(): boolean {
        return this.indeterminatedField;
    }

    public set indeterminated(value: boolean) {
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

    public readonly inverted = `<m-checkbox inverted></m-checkbox>`;
}
