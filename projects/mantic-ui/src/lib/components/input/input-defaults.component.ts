import { Component, effect, input, OnDestroy } from '@angular/core';
import { IconType } from '../icon/models/icon-type';
import { InputBaseComponent } from './input-base.component';

@Component({
    selector: 'm-input-defaults',
    template: ''
})
export class InputDefaultsComponent implements OnDestroy {
    private readonly previousReadonlyIcon = InputBaseComponent.defaults.readonlyIcon();
    private readonly previousReadonlyText = InputBaseComponent.defaults.readonlyText();
    private readonly previousShowReadonlyIcon = InputBaseComponent.defaults.showReadonlyIcon();
    private currentReadonlyIcon?: IconType;
    private currentReadonlyText?: string;
    private currentShowReadonlyIcon?: boolean;
    public readonly inverted = input<boolean>();
    public readonly readonlyIcon = input<IconType>();
    public readonly readonlyText = input<string>();
    public readonly showReadonlyIcon = input<boolean>();

    public constructor() {
        effect(() => {
            const value = this.readonlyIcon();
            if (value !== undefined) {
                this.currentReadonlyIcon = value;
                InputBaseComponent.defaults.readonlyIcon.set(value);
            }
        });
        effect(() => {
            const value = this.readonlyText();
            if (value !== undefined) {
                this.currentReadonlyText = value;
                InputBaseComponent.defaults.readonlyText.set(value);
            }
        });
        effect(() => {
            const value = this.showReadonlyIcon();
            if (value !== undefined) {
                this.currentShowReadonlyIcon = value;
                InputBaseComponent.defaults.showReadonlyIcon.set(value);
            }
        });
        effect(() => {
            const value = this.inverted();
            if (value !== undefined) {
                InputBaseComponent.defaults.inverted.set(value);
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.currentReadonlyIcon === InputBaseComponent.defaults.readonlyIcon()) {
            InputBaseComponent.defaults.readonlyIcon.set(this.previousReadonlyIcon);
        }
        if (this.currentReadonlyText === InputBaseComponent.defaults.readonlyText()) {
            InputBaseComponent.defaults.readonlyText.set(this.previousReadonlyText);
        }
        if (this.currentShowReadonlyIcon === InputBaseComponent.defaults.showReadonlyIcon()) {
            InputBaseComponent.defaults.showReadonlyIcon.set(this.previousShowReadonlyIcon);
        }
    }
}
