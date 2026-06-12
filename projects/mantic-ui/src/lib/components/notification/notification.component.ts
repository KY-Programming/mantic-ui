import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy, input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { MessageAttached, MessageComponent } from '../message/message.component';
import { Notification } from './notification';
import { NotificationInjectorPipe } from './notification-injector.pipe';
import { NotificationService } from './notification.service';

@Component({
    selector: 'm-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
    imports: [MessageComponent, NotificationInjectorPipe, NgTemplateOutlet, NgComponentOutlet],
    changeDetection: ChangeDetectionStrategy.Eager,
    providers: [...BaseComponent.providers]
})
export class NotificationComponent extends BaseComponent {
    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    public set fromService(value: string) {
        this.messages = this.notificationService.get(value);
    }

    public readonly messages = input<Notification[]>([]);

    public readonly mode = input<'overlap' | 'stack'>('stack');

    public readonly attached = input<MessageAttached>();

    public constructor(
        private readonly notificationService: NotificationService
    ) {
        super();
        this.classes.register('fromService', 'mode');
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
