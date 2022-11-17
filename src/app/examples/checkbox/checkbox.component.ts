import { Component } from '@angular/core';

@Component({
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
    private readonlyField: boolean;
    private checkedField: boolean;
    private indeterminatedField: boolean;
    private disabledField: boolean;

    public text = 'Label Text';

    public set readonly(value: boolean) {
        this.readonlyField = value;
        this.disabledField = false;
    }

    public get readonly(): boolean {
        return this.readonlyField;
    }

    public set checked(value: boolean) {
        this.checkedField = value;
        this.indeterminatedField = false;
    }

    public get checked(): boolean {
        return this.checkedField;
    }

    public set indeterminated(value: boolean) {
        this.indeterminatedField = value;
        this.checkedField = false;
    }

    public get indeterminated(): boolean {
        return this.indeterminatedField;
    }

    public set disabled(value: boolean) {
        this.disabledField = value;
        this.readonlyField = false;
    }

    public get disabled(): boolean {
        return this.disabledField;
    }

    public readonly inverted = `<m-checkbox inverted></m-checkbox>`;
}
