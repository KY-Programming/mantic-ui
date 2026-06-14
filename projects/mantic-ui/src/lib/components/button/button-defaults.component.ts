import { Component, effect, input } from '@angular/core';
import { ButtonComponent } from './button.component';

@Component({
    selector: 'm-button-defaults',
    template: ''
})
export class ButtonDefaultsComponent {
    public readonly inverted = input<boolean>();

    public constructor() {
        effect(() => {
            const value = this.inverted();
            if (value !== undefined) {
                ButtonComponent.defaults.inverted.set(value);
            }
        });
    }
}
