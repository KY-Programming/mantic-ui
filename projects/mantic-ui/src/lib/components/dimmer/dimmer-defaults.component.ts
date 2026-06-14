import { Component, effect, input } from '@angular/core';
import { DimmerComponent } from './dimmer.component';

@Component({
    selector: 'm-dimmer-defaults',
    template: ''
})
export class DimmerDefaultsComponent {
    public readonly inverted = input<boolean>();

    public constructor() {
        effect(() => {
            const value = this.inverted();
            if (value !== undefined) {
                DimmerComponent.defaults.inverted.set(value);
            }
        });
    }
}
