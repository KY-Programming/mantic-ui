import { Component, Input, OnDestroy } from '@angular/core';
import { IconType } from '../icon/icon-type';
import { IconSize } from '../icon/icon-size';
import { LabelDropdownComponent } from './label-dropdown.component';

@Component({
    selector: 'm-label-dropdown-defaults',
    template: '',
    })
export class LabelDropdownDefaultsComponent implements OnDestroy {
    private readonly previousDropdownIcon = LabelDropdownComponent.defaults.dropdownIcon;
    private readonly previousDropdownIconSize = LabelDropdownComponent.defaults.dropdownIconSize;
    private currentDropdownIcon?: IconType;
    private currentDropdownIconSize?: IconSize;

    @Input()
    public set dropdownIcon(value: IconType) {
        this.currentDropdownIcon = value;
        LabelDropdownComponent.defaults.dropdownIcon = value;
    }

    @Input()
    public set dropdownIconSize(value: IconSize) {
        this.currentDropdownIconSize = value;
        LabelDropdownComponent.defaults.dropdownIconSize = value;
    }

    public ngOnDestroy(): void {
        if (this.currentDropdownIcon === LabelDropdownComponent.defaults.dropdownIcon) {
            LabelDropdownComponent.defaults.dropdownIcon = this.previousDropdownIcon;
        }
        if (this.currentDropdownIconSize === LabelDropdownComponent.defaults.dropdownIconSize) {
            LabelDropdownComponent.defaults.dropdownIconSize = this.previousDropdownIconSize;
        }
    }
}
