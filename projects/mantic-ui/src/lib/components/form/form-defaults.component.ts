import { Component, Input } from '@angular/core';
import { FormComponent } from './form.component';

@Component({
    selector: 'm-form-defaults',
    template: '',
    })
export class FormDefaultsComponent {
    @Input()
    public set inverted(value: boolean) {
        FormComponent.defaults.inverted = value;
        FormComponent.defaults.invertedChange.next(value);
    }
}
