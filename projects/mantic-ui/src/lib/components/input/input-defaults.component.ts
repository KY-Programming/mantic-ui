import { Component, effect, input } from '@angular/core';
import { InputBaseComponent } from './input-base.component';

@Component({
    selector: 'm-input-defaults',
    template: ''
})
export class InputDefaultsComponent {
    public readonly inverted = input<boolean>();

    public constructor() {
        effect(() => {
            const value = this.inverted();
            if (value !== undefined) {
                InputBaseComponent.defaults.inverted.set(value);
            }
        });
    }
}
