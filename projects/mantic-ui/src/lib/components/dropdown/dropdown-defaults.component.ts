import { Component, Input, OnDestroy } from '@angular/core';
import { IconType } from '../icon/icon-type';
import { IconSize } from '../icon/icon-size';
import { DropdownComponent } from './dropdown.component';

@Component({
    selector: 'm-dropdown-defaults',
    template: '',
    standalone: true
})
export class DropdownDefaultsComponent implements OnDestroy {
    private readonly previousDropdownIcon = DropdownComponent.defaults.dropdownIcon;
    private readonly previousDropdownIconSize = DropdownComponent.defaults.dropdownIconSize;
    private readonly previousDeleteIcon = DropdownComponent.defaults.deleteIcon;
    private readonly previousDeleteIconSize = DropdownComponent.defaults.deleteIconSize;
    private currentDropdownIcon?: IconType;
    private currentDropdownIconSize?: IconSize;
    private currentDeleteIcon?: IconType;
    private currentDeleteIconSize?: IconSize;

    @Input()
    public set dropdownIcon(value: IconType) {
        this.currentDropdownIcon = value;
        DropdownComponent.defaults.dropdownIcon = value;
    }

    @Input()
    public set dropdownIconSize(value: IconSize) {
        this.currentDropdownIconSize = value;
        DropdownComponent.defaults.dropdownIconSize = value;
    }

    @Input()
    public set deleteIcon(value: IconType) {
        this.currentDeleteIcon = value;
        DropdownComponent.defaults.deleteIcon = value;
    }

    @Input()
    public set deleteIconSize(value: IconSize) {
        this.currentDeleteIconSize = value;
        DropdownComponent.defaults.deleteIconSize = value;
    }

    @Input()
    public set inverted(value: boolean) {
        DropdownComponent.defaults.inverted = value;
        DropdownComponent.defaults.invertedChange.next(value);
    }

    public ngOnDestroy(): void {
        if (this.currentDropdownIcon === DropdownComponent.defaults.dropdownIcon) {
            DropdownComponent.defaults.dropdownIcon = this.previousDropdownIcon;
        }
        if (this.currentDropdownIconSize === DropdownComponent.defaults.dropdownIconSize) {
            DropdownComponent.defaults.dropdownIconSize = this.previousDropdownIconSize;
        }
        if (this.currentDeleteIcon === DropdownComponent.defaults.deleteIcon) {
            DropdownComponent.defaults.deleteIcon = this.previousDeleteIcon;
        }
        if (this.currentDeleteIconSize === DropdownComponent.defaults.deleteIconSize) {
            DropdownComponent.defaults.deleteIconSize = this.previousDeleteIconSize;
        }
    }
}
