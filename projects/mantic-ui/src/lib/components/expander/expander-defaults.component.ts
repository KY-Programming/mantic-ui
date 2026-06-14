import { Component, effect, input, OnDestroy } from '@angular/core';
import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';
import { ExpanderComponent } from './expander.component';

@Component({
    selector: 'm-expander-defaults',
    template: ''
})
export class ExpanderDefaultsComponent implements OnDestroy {
    private readonly previousDropdownIcon = ExpanderComponent.defaults.dropdownIcon();
    private readonly previousDropdownIconSize = ExpanderComponent.defaults.dropdownIconSize();
    private currentDropdownIcon?: IconType;
    private currentDropdownIconSize?: IconSize;
    public readonly dropdownIcon = input<IconType>();
    public readonly dropdownIconSize = input<IconSize>();

    public constructor() {
        effect(() => {
            const value = this.dropdownIcon();
            if (value !== undefined) {
                this.currentDropdownIcon = value;
                ExpanderComponent.defaults.dropdownIcon.set(value);
            }
        });
        effect(() => {
            const value = this.dropdownIconSize();
            if (value !== undefined) {
                this.currentDropdownIconSize = value;
                ExpanderComponent.defaults.dropdownIconSize.set(value);
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.currentDropdownIcon === ExpanderComponent.defaults.dropdownIcon()) {
            ExpanderComponent.defaults.dropdownIcon.set(this.previousDropdownIcon);
        }
        if (this.currentDropdownIconSize === ExpanderComponent.defaults.dropdownIconSize()) {
            ExpanderComponent.defaults.dropdownIconSize.set(this.previousDropdownIconSize);
        }
    }
}
