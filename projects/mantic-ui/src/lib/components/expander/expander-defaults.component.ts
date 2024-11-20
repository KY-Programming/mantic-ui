import { Component, Input, OnDestroy } from '@angular/core';
import { IconType } from '../icon/icon-type';
import { ExpanderComponent } from './expander.component';
import { IconSize } from '../icon/icon-size';

@Component({
    selector: 'm-expander-defaults',
    template: '',
    })
export class ExpanderDefaultsComponent implements OnDestroy {
    private readonly previousDropdownIcon = ExpanderComponent.defaults.dropdownIcon;
    private readonly previousDropdownIconSize = ExpanderComponent.defaults.dropdownIconSize;
    private currentDropdownIcon?: IconType;
    private currentDropdownIconSize?: IconSize;

    @Input()
    public set dropdownIcon(value: IconType) {
        this.currentDropdownIcon = value;
        ExpanderComponent.defaults.dropdownIcon = value;
    }

    @Input()
    public set dropdownIconSize(value: IconSize) {
        this.currentDropdownIconSize = value;
        ExpanderComponent.defaults.dropdownIconSize = value;
    }

    public ngOnDestroy(): void {
        if (this.currentDropdownIcon === ExpanderComponent.defaults.dropdownIcon) {
            ExpanderComponent.defaults.dropdownIcon = this.previousDropdownIcon;
        }
        if (this.currentDropdownIconSize === ExpanderComponent.defaults.dropdownIconSize) {
            ExpanderComponent.defaults.dropdownIconSize = this.previousDropdownIconSize;
        }
    }
}
