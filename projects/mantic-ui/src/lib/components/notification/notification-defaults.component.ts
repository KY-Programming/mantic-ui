import { Component, Input, OnDestroy } from '@angular/core';
import { IconType } from '../icon/icon-type';
import { NotificationService } from './notification.service';

@Component({
    selector: 'm-notification-defaults',
    template: '',
    })
export class NotificationDefaultsComponent implements OnDestroy {
    private readonly previousSuccessIcon = NotificationService.defaults.successIcon;
    private currentSuccessIcon?: IconType;

    @Input()
    public set successIcon(value: IconType) {
        this.currentSuccessIcon = value;
        NotificationService.defaults.successIcon = value;
    }

    public ngOnDestroy(): void {
        if (this.currentSuccessIcon === NotificationService.defaults.successIcon) {
            NotificationService.defaults.successIcon = this.previousSuccessIcon;
        }
    }
}
