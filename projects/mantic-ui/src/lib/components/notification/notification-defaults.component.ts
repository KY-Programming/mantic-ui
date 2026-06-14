import { Component, effect, input, OnDestroy } from '@angular/core';
import { IconType } from '../icon/models/icon-type';
import { NotificationService } from './services/notification.service';

@Component({
    selector: 'm-notification-defaults',
    template: ''
})
export class NotificationDefaultsComponent implements OnDestroy {
    private readonly previousSuccessIcon = NotificationService.defaults.successIcon();
    private currentSuccessIcon?: IconType;
    public readonly successIcon = input<IconType>();

    public constructor() {
        effect(() => {
            const value = this.successIcon();
            if (value !== undefined) {
                this.currentSuccessIcon = value;
                NotificationService.defaults.successIcon.set(value);
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.currentSuccessIcon === NotificationService.defaults.successIcon()) {
            NotificationService.defaults.successIcon.set(this.previousSuccessIcon);
        }
    }
}
