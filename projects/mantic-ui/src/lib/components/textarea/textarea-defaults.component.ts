import { Component, effect, input, OnDestroy } from '@angular/core';
import { TextareaComponent } from './textarea.component';

@Component({
    selector: 'm-textarea-defaults',
    template: ''
})
export class TextareaDefaultsComponent implements OnDestroy {
    private readonly previousInverted = TextareaComponent.defaults.inverted();
    private currentInverted?: boolean;
    public readonly inverted = input<boolean>();

    public constructor() {
        effect(() => {
            const value = this.inverted();
            if (value !== undefined) {
                this.currentInverted = value;
                TextareaComponent.defaults.inverted.set(value);
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.currentInverted === TextareaComponent.defaults.inverted()) {
            TextareaComponent.defaults.inverted.set(this.previousInverted);
        }
    }
}
