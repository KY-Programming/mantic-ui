import { Component, effect, input, OnDestroy } from '@angular/core';
import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';
import { FieldComponent } from './field.component';

@Component({
    selector: 'm-field-defaults',
    template: ''
})
export class FieldDefaultsComponent implements OnDestroy {
    private readonly previousHintIcon = FieldComponent.defaults.hintIcon();
    private readonly previousHintIconSize = FieldComponent.defaults.hintIconSize();
    private readonly previousErrorIcon = FieldComponent.defaults.errorIcon();
    private readonly previousErrorIconSize = FieldComponent.defaults.errorIconSize();
    private currentHintIcon?: IconType;
    private currentHintIconSize?: IconSize;
    private currentErrorIcon?: IconType;
    private currentErrorIconSize?: IconSize;
    public readonly hintIcon = input<IconType>();
    public readonly hintIconSize = input<IconSize>();
    public readonly errorIcon = input<IconType>();
    public readonly errorIconSize = input<IconSize>();

    public constructor() {
        effect(() => {
            const value = this.hintIcon();
            if (value === undefined) {
                return;
            }
            this.currentHintIcon = value;
            FieldComponent.defaults.hintIcon.set(value);
        });
        effect(() => {
            const value = this.hintIconSize();
            if (value === undefined) {
                return;
            }
            this.currentHintIconSize = value;
            FieldComponent.defaults.hintIconSize.set(value);
        });
        effect(() => {
            const value = this.errorIcon();
            if (value === undefined) {
                return;
            }
            this.currentErrorIcon = value;
            FieldComponent.defaults.errorIcon.set(value);
        });
        effect(() => {
            const value = this.errorIconSize();
            if (value === undefined) {
                return;
            }
            this.currentErrorIconSize = value;
            FieldComponent.defaults.errorIconSize.set(value);
        });
    }

    public ngOnDestroy(): void {
        if (this.currentHintIcon === FieldComponent.defaults.hintIcon()) {
            FieldComponent.defaults.hintIcon.set(this.previousHintIcon);
        }
        if (this.currentHintIconSize === FieldComponent.defaults.hintIconSize()) {
            FieldComponent.defaults.hintIconSize.set(this.previousHintIconSize);
        }
        if (this.currentErrorIcon === FieldComponent.defaults.errorIcon()) {
            FieldComponent.defaults.errorIcon.set(this.previousErrorIcon);
        }
        if (this.currentErrorIconSize === FieldComponent.defaults.errorIconSize()) {
            FieldComponent.defaults.errorIconSize.set(this.previousErrorIconSize);
        }
    }
}
