import { Component, Input } from '@angular/core';
import { NotificationService } from './notification.service';
import { Notification } from './notification';
import { BaseComponent } from '../../base/base.component';
import { MessageComponent } from '../message/message.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'm-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
    standalone: true,
    hostDirectives: [...BaseComponent.directives],
    imports: [
        CommonModule,
        MessageComponent
    ],
    providers: [...BaseComponent.providers]
})
export class NotificationComponent extends BaseComponent {
    @Input()
    public set fromService(value: string) {
        this.messages = this.notificationService.get(value);
    }

    @Input()
    public messages: Notification[];

    @Input()
    public mode: 'overlap' | 'stack' = 'stack';

    public constructor(
        private readonly notificationService: NotificationService
    ) {
        super();
        this.classes.register('fromService', 'mode');
    }

    public close(message: Notification): void {
        this.notificationService.remove(message);
    }
}
