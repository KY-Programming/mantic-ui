import { Component, Input, OnDestroy } from '@angular/core';
import { IconSize } from '../icon/icon-size';
import { IconType } from '../icon/icon-type';
import { FieldComponent } from './field.component';

@Component({
    selector: 'm-field-defaults',
    template: '',
    })
export class FieldDefaultsComponent implements OnDestroy {
    private readonly previousHintIcon = FieldComponent.defaults.hintIcon;
    private readonly previousHintIconSize = FieldComponent.defaults.hintIconSize;
    private readonly previousErrorIcon = FieldComponent.defaults.errorIcon;
    private readonly previousErrorIconSize = FieldComponent.defaults.errorIconSize;
    private currentHintIcon?: IconType;
    private currentHintIconSize?: IconType;
    private currentErrorIcon?: IconType;
    private currentErrorIconSize?: IconType;

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

    @Input()
    public set errorIcon(value: IconType) {
        this.currentErrorIcon = value;
        FieldComponent.defaults.errorIcon = value;
    }

    @Input()
    public set errorIconSize(value: IconSize) {
        this.currentErrorIconSize = value;
        FieldComponent.defaults.errorIconSize = value;
    }

    public ngOnDestroy(): void {
        if (this.currentHintIcon === FieldComponent.defaults.hintIcon) {
            FieldComponent.defaults.hintIcon = this.previousHintIcon;
        }
        if (this.currentHintIconSize === FieldComponent.defaults.hintIconSize) {
            FieldComponent.defaults.hintIconSize = this.previousHintIconSize;
        }
        if (this.currentErrorIcon === FieldComponent.defaults.errorIcon) {
            FieldComponent.defaults.errorIcon = this.previousErrorIcon;
        }
        if (this.currentErrorIconSize === FieldComponent.defaults.errorIconSize) {
            FieldComponent.defaults.errorIconSize = this.previousErrorIconSize;
        }
    }
}
