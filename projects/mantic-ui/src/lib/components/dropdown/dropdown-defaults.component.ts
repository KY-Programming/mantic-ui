import { Component, effect, input, OnDestroy } from '@angular/core';
import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';
import { DropdownComponent } from './dropdown.component';

@Component({
    selector: 'm-dropdown-defaults',
    template: ''
})
export class DropdownDefaultsComponent implements OnDestroy {
    private readonly previousDropdownIcon = DropdownComponent.defaults.dropdownIcon();
    private readonly previousDropdownIconSize = DropdownComponent.defaults.dropdownIconSize();
    private readonly previousDeleteIcon = DropdownComponent.defaults.deleteIcon();
    private readonly previousDeleteIconSize = DropdownComponent.defaults.deleteIconSize();
    private currentDropdownIcon?: IconType;
    private currentDropdownIconSize?: IconSize;
    private currentDeleteIcon?: IconType;
    private currentDeleteIconSize?: IconSize;
    public readonly dropdownIcon = input<IconType>();
    public readonly dropdownIconSize = input<IconSize>();
    public readonly deleteIcon = input<IconType>();
    public readonly deleteIconSize = input<IconSize>();
    public readonly inverted = input<boolean>();

    public constructor() {
        effect(() => {
            const value = this.dropdownIcon();
            if (value !== undefined) {
                this.currentDropdownIcon = value;
                DropdownComponent.defaults.dropdownIcon.set(value);
            }
        });
        effect(() => {
            const value = this.dropdownIconSize();
            if (value !== undefined) {
                this.currentDropdownIconSize = value;
                DropdownComponent.defaults.dropdownIconSize.set(value);
            }
        });
        effect(() => {
            const value = this.deleteIcon();
            if (value !== undefined) {
                this.currentDeleteIcon = value;
                DropdownComponent.defaults.deleteIcon.set(value);
            }
        });
        effect(() => {
            const value = this.deleteIconSize();
            if (value !== undefined) {
                this.currentDeleteIconSize = value;
                DropdownComponent.defaults.deleteIconSize.set(value);
            }
        });
        effect(() => {
            const value = this.inverted();
            if (value !== undefined) {
                DropdownComponent.defaults.inverted.set(value);
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.currentDropdownIcon === DropdownComponent.defaults.dropdownIcon()) {
            DropdownComponent.defaults.dropdownIcon.set(this.previousDropdownIcon);
        }
        if (this.currentDropdownIconSize === DropdownComponent.defaults.dropdownIconSize()) {
            DropdownComponent.defaults.dropdownIconSize.set(this.previousDropdownIconSize);
        }
        if (this.currentDeleteIcon === DropdownComponent.defaults.deleteIcon()) {
            DropdownComponent.defaults.deleteIcon.set(this.previousDeleteIcon);
        }
        if (this.currentDeleteIconSize === DropdownComponent.defaults.deleteIconSize()) {
            DropdownComponent.defaults.deleteIconSize.set(this.previousDeleteIconSize);
        }
    }
}
