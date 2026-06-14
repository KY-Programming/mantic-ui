import { Component, effect, input, OnDestroy } from '@angular/core';
import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';
import { LabelDropdownComponent } from './label-dropdown.component';

@Component({
    selector: 'm-label-dropdown-defaults',
    template: ''
})
export class LabelDropdownDefaultsComponent implements OnDestroy {
    private readonly previousDropdownIcon = LabelDropdownComponent.defaults.dropdownIcon();
    private readonly previousDropdownIconSize = LabelDropdownComponent.defaults.dropdownIconSize();
    private currentDropdownIcon?: IconType;
    private currentDropdownIconSize?: IconSize;
    public readonly dropdownIcon = input<IconType>();
    public readonly dropdownIconSize = input<IconSize>();

    public constructor() {
        effect(() => {
            const value = this.dropdownIcon();
            if (value !== undefined) {
                this.currentDropdownIcon = value;
                LabelDropdownComponent.defaults.dropdownIcon.set(value);
            }
        });
        effect(() => {
            const value = this.dropdownIconSize();
            if (value !== undefined) {
                this.currentDropdownIconSize = value;
                LabelDropdownComponent.defaults.dropdownIconSize.set(value);
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.currentDropdownIcon === LabelDropdownComponent.defaults.dropdownIcon()) {
            LabelDropdownComponent.defaults.dropdownIcon.set(this.previousDropdownIcon);
        }
        if (this.currentDropdownIconSize === LabelDropdownComponent.defaults.dropdownIconSize()) {
            LabelDropdownComponent.defaults.dropdownIconSize.set(this.previousDropdownIconSize);
        }
    }
}
