import { Component, effect, input, OnDestroy } from '@angular/core';
import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';
import { CheckboxComponent } from './checkbox.component';

@Component({
    selector: 'm-checkbox-defaults',
    template: ''
})
export class CheckboxDefaultsComponent implements OnDestroy {
    private readonly previousDropdownIcon = CheckboxComponent.defaults.checkIcon();
    private readonly previousDropdownIconSize = CheckboxComponent.defaults.checkIconSize();
    private readonly previousDeleteIcon = CheckboxComponent.defaults.indeterminateIcon();
    private readonly previousDeleteIconSize = CheckboxComponent.defaults.indeterminateIconSize();
    private currentCheckIcon?: IconType;
    private currentCheckIconSize?: IconSize;
    private currentIndeterminateIcon?: IconType;
    private currentIndeterminateIconSize?: IconSize;
    public readonly checkIcon = input<IconType>();
    public readonly checkIconSize = input<IconSize>();
    public readonly indeterminateIcon = input<IconType>();
    public readonly indeterminateIconSize = input<IconSize>();
    public readonly inverted = input<boolean>();

    public constructor() {
        effect(() => {
            const value = this.checkIcon();
            if (value !== undefined) {
                this.currentCheckIcon = value;
                CheckboxComponent.defaults.checkIcon.set(value);
            }
        });
        effect(() => {
            const value = this.checkIconSize();
            if (value !== undefined) {
                this.currentCheckIconSize = value;
                CheckboxComponent.defaults.checkIconSize.set(value);
            }
        });
        effect(() => {
            const value = this.indeterminateIcon();
            if (value !== undefined) {
                this.currentIndeterminateIcon = value;
                CheckboxComponent.defaults.indeterminateIcon.set(value);
            }
        });
        effect(() => {
            const value = this.indeterminateIconSize();
            if (value !== undefined) {
                this.currentIndeterminateIconSize = value;
                CheckboxComponent.defaults.indeterminateIconSize.set(value);
            }
        });
        effect(() => {
            const value = this.inverted();
            if (value !== undefined) {
                CheckboxComponent.defaults.inverted.set(value);
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.currentCheckIcon === CheckboxComponent.defaults.checkIcon()) {
            CheckboxComponent.defaults.checkIcon.set(this.previousDropdownIcon);
        }
        if (this.currentCheckIconSize === CheckboxComponent.defaults.checkIconSize()) {
            CheckboxComponent.defaults.checkIconSize.set(this.previousDropdownIconSize);
        }
        if (this.currentIndeterminateIcon === CheckboxComponent.defaults.indeterminateIcon()) {
            CheckboxComponent.defaults.indeterminateIcon.set(this.previousDeleteIcon);
        }
        if (this.currentIndeterminateIconSize === CheckboxComponent.defaults.indeterminateIconSize()) {
            CheckboxComponent.defaults.indeterminateIconSize.set(this.previousDeleteIconSize);
        }
    }
}
