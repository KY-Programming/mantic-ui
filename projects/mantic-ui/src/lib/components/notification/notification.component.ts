import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { Component, effect, inject, input, model } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { MessageComponent } from '../message/message.component';
import { MessageAttached } from '../message/models/message-attached';
import { Notification } from './models/notification';
import { NotificationInjectorPipe } from './notification-injector.pipe';
import { NotificationService } from './services/notification.service';

@Component({
    selector: 'm-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
    imports: [MessageComponent, NotificationInjectorPipe, NgTemplateOutlet, NgComponentOutlet],
    providers: [...BaseComponent.providers]
})
export class NotificationComponent extends BaseComponent {
    private readonly notificationService = inject(NotificationService);
    public readonly fromService = input<string>();
    public readonly messages = model<Notification[]>([]);
    public readonly mode = input<'overlap' | 'stack'>('stack');
    public readonly attached = input<MessageAttached>();

    public constructor() {
        super();
        this.classes.register('fromService', 'mode');
        effect(() => {
            const value = this.fromService();
            if (value) {
                this.messages.set(this.notificationService.get(value));
            }
        });
    }

    public close(message: Notification, event: MouseEvent): void {
        if (event.defaultPrevented) {
            return;
        }
        this.notificationService.remove(message);
    }

    protected $message(message: unknown): Notification {
        return message as Notification;
    }
}
