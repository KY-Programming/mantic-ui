import { Component, Input, OnDestroy } from '@angular/core';
import { IconType } from '../icon/icon-type';
import { IconSize } from '../icon/icon-size';
import { FieldComponent } from './field.component';

@Component({
    selector: 'm-field-defaults',
    template: '',
    standalone: true
})
export class FieldDefaultsComponent implements OnDestroy {
    private readonly previousHintIcon = FieldComponent.defaults.hintIcon;
    private readonly previousHintIconSize = FieldComponent.defaults.hintIconSize;
    private currentHintIcon?: IconType;
    private currentHintIconSize?: IconType;

    @Input()
    public set hintIcon(value: IconType) {
        this.currentHintIcon = value;
        FieldComponent.defaults.hintIcon = value;
    }

    @Input()
    public set hintIconSize(value: IconSize) {
        this.currentHintIconSize = value;
        FieldComponent.defaults.hintIconSize = value;
    }

    public ngOnDestroy(): void {
        if (this.currentHintIcon === FieldComponent.defaults.hintIcon) {
            FieldComponent.defaults.hintIcon = this.previousHintIcon;
        }
        if (this.currentHintIconSize === FieldComponent.defaults.hintIconSize) {
            FieldComponent.defaults.hintIconSize = this.previousHintIconSize;
        }
    }
}
