import { Component, effect, input, OnDestroy } from '@angular/core';
import { toBooleanWithUndefined } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { IconType } from '../icon/models/icon-type';
import { InputBaseComponent } from './input-base.component';

@Component({
    selector: 'm-input-defaults',
    template: ''
})
export class InputDefaultsComponent implements OnDestroy {
    private readonly previousReadonlyIcon = InputBaseComponent.defaults.readonlyIcon();
    private readonly previousReadonlyText = InputBaseComponent.defaults.readonlyText();
    private readonly previousHideReadonlyIcon = InputBaseComponent.defaults.hideReadonlyIcon();
    private currentReadonlyIcon?: IconType;
    private currentReadonlyText?: string;
    private currentHideReadonlyIcon?: boolean;
    public readonly inverted = input<boolean>();
    public readonly readonlyIcon = input<IconType>();
    public readonly readonlyText = input<string>();
    public readonly hideReadonlyIcon = input<boolean | undefined, BooleanLike>(undefined, { transform: toBooleanWithUndefined });

    public constructor() {
        effect(() => {
            const value = this.readonlyIcon();
            if (value === undefined) {
                return;
            }
            this.currentReadonlyIcon = value;
            InputBaseComponent.defaults.readonlyIcon.set(value);
        });
        effect(() => {
            const value = this.readonlyText();
            if (value === undefined) {
                return;
            }
            this.currentReadonlyText = value;
            InputBaseComponent.defaults.readonlyText.set(value);
        });
        effect(() => {
            const value = this.hideReadonlyIcon();
            if (value === undefined) {
                return;
            }
            this.currentHideReadonlyIcon = value;
            InputBaseComponent.defaults.hideReadonlyIcon.set(value);
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
        if (this.currentHideReadonlyIcon === InputBaseComponent.defaults.hideReadonlyIcon()) {
            InputBaseComponent.defaults.hideReadonlyIcon.set(this.previousHideReadonlyIcon);
        }
    }
}
