import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { NotificationService } from './notification.service';
import { Notification } from './notification';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'm-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent extends MessageComponent {

    @HostBinding('class.visible')
    public get visible(): boolean {
        return this.messages && this.messages.length > 0;
    }

    // TODO: Remove
    @HostBinding('class.error')
    public get errorClass(): boolean {
        return this.messages && this.messages.length > 0 && this.messages[0].type === 'error';
    }

    // TODO: Remove
    @HostBinding('class.warning')
    public get warningClass(): boolean {
        return this.messages && this.messages.length > 0 && this.messages[0].type === 'warning';
    }

    // TODO: Remove
    @HostBinding('class.success')
    public get successClass(): boolean {
        return this.messages && this.messages.length > 0 && this.messages[0].type === 'success';
    }

    // TODO: Remove
    @HostBinding('class.positive')
    public get positiveClass(): boolean {
        return this.messages && this.messages.length > 0 && this.messages[0].type === 'positive';
    }

    @Input()
    public set fromService(value: boolean) {
        if (value) {
            this.messages = this.notificationService.messages;
            this.notificationService.added.pipe(takeUntil(this.destroy)).subscribe(() => this.refresh());
            this.notificationService.removed.pipe(takeUntil(this.destroy)).subscribe(() => this.refresh());
        }
    }

    @Input()
    public messages: Notification[];

    constructor(
        elementRef: ElementRef<HTMLElement>,
        private readonly notificationService: NotificationService
    ) {
        super(elementRef);
    }

    private refresh(): void {
        this.error = this.messages && this.messages[0].type === 'error';
        this.warning = this.messages && this.messages[0].type === 'warning';
        this.success = this.messages && this.messages[0].type === 'success';
        this.positive = this.messages && this.messages[0].type === 'positive';
    }

    public close(message: Notification): void {
        this.notificationService.remove(message);
    }
}
