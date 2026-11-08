import { Component, effect, input, OnDestroy } from '@angular/core';
import { ColorInputComponent } from './color-input.component';
import { ColorPreset } from './models/color-preset';

/** App-wide defaults of `m-color-input`, e.g. a theme's palette as `presets` */
@Component({
    selector: 'm-color-input-defaults',
    template: ''
})
export class ColorInputDefaultsComponent implements OnDestroy {
    private readonly previousPresets = ColorInputComponent.defaults.presets();
    private readonly previousPickText = ColorInputComponent.defaults.pickText();
    private readonly previousTransparentText = ColorInputComponent.defaults.transparentText();
    private currentPresets?: readonly ColorPreset[];
    private currentPickText?: string;
    private currentTransparentText?: string;
    public readonly presets = input<readonly ColorPreset[]>();
    public readonly pickText = input<string>();
    public readonly transparentText = input<string>();

    public constructor() {
        effect(() => {
            const value = this.presets();
            if (value !== undefined) {
                this.currentPresets = value;
                ColorInputComponent.defaults.presets.set(value);
            }
        });
        effect(() => {
            const value = this.pickText();
            if (value !== undefined) {
                this.currentPickText = value;
                ColorInputComponent.defaults.pickText.set(value);
            }
        });
        effect(() => {
            const value = this.transparentText();
            if (value !== undefined) {
                this.currentTransparentText = value;
                ColorInputComponent.defaults.transparentText.set(value);
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.currentPresets === ColorInputComponent.defaults.presets()) {
            ColorInputComponent.defaults.presets.set(this.previousPresets);
        }
        if (this.currentPickText === ColorInputComponent.defaults.pickText()) {
            ColorInputComponent.defaults.pickText.set(this.previousPickText);
        }
        if (this.currentTransparentText === ColorInputComponent.defaults.transparentText()) {
            ColorInputComponent.defaults.transparentText.set(this.previousTransparentText);
        }
    }
}
