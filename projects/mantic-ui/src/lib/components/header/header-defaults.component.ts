import { Component, effect, input, OnDestroy } from '@angular/core';
import { HeaderComponent } from './header.component';

@Component({
    selector: 'm-header-defaults',
    template: ''
})
export class HeaderDefaultsComponent implements OnDestroy {
    private readonly previousInverted = HeaderComponent.defaults.inverted();
    private currentInverted?: boolean;
    public readonly inverted = input<boolean>();

    public constructor() {
        effect(() => {
            const value = this.inverted();
            if (value !== undefined) {
                this.currentInverted = value;
                HeaderComponent.defaults.inverted.set(value);
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.currentInverted === HeaderComponent.defaults.inverted()) {
            HeaderComponent.defaults.inverted.set(this.previousInverted);
        }
    }
}
