import { Component, Input, OnDestroy } from '@angular/core';
import { IconType } from '../icon/icon-type';
import { IconSize } from '../icon/icon-size';
import { CheckboxComponent } from './checkbox.component';

@Component({
    selector: 'm-checkbox-defaults',
    template: ''
})
export class CheckboxDefaultsComponent implements OnDestroy {
    private readonly previousDropdownIcon = CheckboxComponent.defaults.checkIcon;
    private readonly previousDropdownIconSize = CheckboxComponent.defaults.checkIconSize;
    private readonly previousDeleteIcon = CheckboxComponent.defaults.indeterminateIcon;
    private readonly previousDeleteIconSize = CheckboxComponent.defaults.indeterminateIconSize;
    private currentCheckIcon?: IconType;
    private currentCheckIconSize?: IconSize;
    private currentIndeterminateIcon?: IconType;
    private currentIndeterminateIconSize?: IconSize;

    @Input()
    public set checkIcon(value: IconType) {
        this.currentCheckIcon = value;
        CheckboxComponent.defaults.checkIcon = value;
    }

    @Input()
    public set checkIconSize(value: IconSize) {
        this.currentCheckIconSize = value;
        CheckboxComponent.defaults.checkIconSize = value;
    }

    @Input()
    public set indeterminateIcon(value: IconType) {
        this.currentIndeterminateIcon = value;
        CheckboxComponent.defaults.indeterminateIcon = value;
    }

    @Input()
    public set indeterminateIconSize(value: IconSize) {
        this.currentIndeterminateIconSize = value;
        CheckboxComponent.defaults.indeterminateIconSize = value;
    }

    @Input()
    public set inverted(value: boolean) {
        CheckboxComponent.defaults.inverted = value;
        CheckboxComponent.defaults.invertedChange.next(value);
    }

    public ngOnDestroy(): void {
        if (this.currentCheckIcon === CheckboxComponent.defaults.checkIcon) {
            CheckboxComponent.defaults.checkIcon = this.previousDropdownIcon;
        }
        if (this.currentCheckIconSize === CheckboxComponent.defaults.checkIconSize) {
            CheckboxComponent.defaults.checkIconSize = this.previousDropdownIconSize;
        }
        if (this.currentIndeterminateIcon === CheckboxComponent.defaults.indeterminateIcon) {
            CheckboxComponent.defaults.indeterminateIcon = this.previousDeleteIcon;
        }
        if (this.currentIndeterminateIconSize === CheckboxComponent.defaults.indeterminateIconSize) {
            CheckboxComponent.defaults.indeterminateIconSize = this.previousDeleteIconSize;
        }
    }
}
