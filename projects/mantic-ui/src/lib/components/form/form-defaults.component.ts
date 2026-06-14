import { Component, effect, input } from '@angular/core';
import { FormComponent } from './form.component';

@Component({
    selector: 'm-form-defaults',
    template: ''
})
export class FormDefaultsComponent {
    public readonly inverted = input<boolean>();

    public constructor() {
        effect(() => {
            const value = this.inverted();
            if (value !== undefined) {
                FormComponent.defaults.inverted.set(value);
            }
        });
    }
}
