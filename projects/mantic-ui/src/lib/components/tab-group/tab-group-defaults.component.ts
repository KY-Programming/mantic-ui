import { Component, effect, input, OnDestroy } from '@angular/core';
import { TabGroupComponent } from './tab-group.component';

@Component({
    selector: 'm-tab-group-defaults',
    template: ''
})
export class TabGroupDefaultsComponent implements OnDestroy {
    private readonly previousInverted = TabGroupComponent.defaults.inverted();
    private currentInverted?: boolean;
    public readonly inverted = input<boolean>();

    public constructor() {
        effect(() => {
            const value = this.inverted();
            if (value !== undefined) {
                this.currentInverted = value;
                TabGroupComponent.defaults.inverted.set(value);
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.currentInverted === TabGroupComponent.defaults.inverted()) {
            TabGroupComponent.defaults.inverted.set(this.previousInverted);
        }
    }
}
