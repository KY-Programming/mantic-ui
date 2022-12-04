import { Component, Input, OnDestroy } from '@angular/core';
import { IconType } from '../icon/icon-type';
import { MessageComponent } from './message.component';
import { IconSize } from '../icon/icon-size';

@Component({
    selector: 'm-message-defaults',
    template: '',
    standalone: true
})
export class MessageDefaultsComponent implements OnDestroy {
    private readonly previousCloseIcon = MessageComponent.defaults.closeIcon;
    private readonly previousCloseIconSize = MessageComponent.defaults.closeIconSize;
    private currentCloseIcon?: IconType;
    private currentCloseIconSize?: IconType;

    @Input()
    public set closeIcon(value: IconType) {
        this.currentCloseIcon = value;
        MessageComponent.defaults.closeIcon = value;
    }

    @Input()
    public set closeIconSize(value: IconSize) {
        this.currentCloseIconSize = value;
        MessageComponent.defaults.closeIconSize = value;
    }

    public ngOnDestroy(): void {
        if (this.currentCloseIcon === MessageComponent.defaults.closeIcon) {
            MessageComponent.defaults.closeIcon = this.previousCloseIcon;
        }
        if (this.currentCloseIconSize === MessageComponent.defaults.closeIconSize) {
            MessageComponent.defaults.closeIconSize = this.previousCloseIconSize;
        }
    }
}
