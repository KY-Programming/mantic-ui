import { JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-value',
    imports: [
        JsonPipe
    ],
    templateUrl: './value.component.html',
    styleUrls: ['./value.component.scss']
})
export class ValueComponent {
    private valueField: unknown;
    public type?: string;

    @Input()
    public get value(): unknown {
        return this.valueField;
    }

    public set value(value: unknown) {
        this.valueField = value;
        this.type = typeof value;
        if (this.type === 'object') {
            this.type = (value as any).constructor.name;
        }
    }

}
