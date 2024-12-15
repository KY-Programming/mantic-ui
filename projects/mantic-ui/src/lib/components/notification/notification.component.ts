import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { MessageAttached, MessageComponent } from '../message/message.component';
import { Notification } from './notification';
import { NotificationInjectorPipe } from './notification-injector.pipe';
import { NotificationService } from './notification.service';

@Component({
    selector: 'm-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
    imports: [
        CommonModule,
        MessageComponent,
        NotificationInjectorPipe
    ],
    providers: [...BaseComponent.providers]
})
export class NotificationComponent extends BaseComponent {
    @Input()
    public set fromService(value: string) {
        this.messages = this.notificationService.get(value);
    }

    @Input()
    public messages: Notification[] = [];

    @Input()
    public mode: 'overlap' | 'stack' = 'stack';

    @Input()
    public attached: MessageAttached;

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
