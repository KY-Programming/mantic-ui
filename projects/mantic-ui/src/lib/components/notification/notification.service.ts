import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IconType } from '../icon/icon-type';
import { AsyncAction } from './async-action';
import { Notification } from './notification';
import { NotificationHandler } from './notification-handler';
import { NotificationRef } from './notification-ref';

@Injectable({
    providedIn: 'root'
})
export class NotificationService implements NotificationHandler {
    public static readonly defaults = {
        successIcon: <IconType>'check'
    };
    private readonly addedSubject = new Subject<Notification>();
    private readonly removedSubject = new Subject<Notification>();
    private readonly erroredSubject = new Subject<Notification>();
    private readonly warnedSubject = new Subject<Notification>();
    private readonly succeededSubject = new Subject<Notification>();
    private readonly positivedSubject = new Subject<Notification>();
    private readonly informedSubject = new Subject<Notification>();
    private readonly messages: Record<string, Notification[]> = {
        all: [],
        empty: []
    };

    public readonly added = this.addedSubject.asObservable();
    public readonly removed = this.removedSubject.asObservable();
    public readonly errored = this.erroredSubject.asObservable();
    public readonly warned = this.warnedSubject.asObservable();
    public readonly succeeded = this.succeededSubject.asObservable();
    public readonly positived = this.positivedSubject.asObservable();
    public readonly informed = this.informedSubject.asObservable();

    public get(group?: 'all' | 'empty' | string): Notification[] {
        group ||= 'all';
        if (!this.messages[group]) {
            this.messages[group] = [];
        }
        return this.messages[group];
    }

    public add(notification: Notification): NotificationRef {
        this.messages['all'].push(notification);
        if (notification.group) {
            this.get(notification.group).push(notification);
        }
        else {
            this.messages['empty'].push(notification);
        }
        this.addedSubject.next(notification);
        if (notification?.timeout && notification.timeout > 0) {
            setTimeout(() => this.remove(notification), notification.timeout);
        }
        return new NotificationRef(notification, this);
    }

    public remove(notification: Notification): void {
        const index = this.messages['all'].indexOf(notification);
        if (index >= 0) {
            this.messages['all'].splice(index, 1);
        }
        if (notification.group) {
            const groupIndex = this.messages[notification.group].indexOf(notification);
            if (groupIndex >= 0) {
                this.messages[notification.group].splice(groupIndex, 1);
            }
        }
        else {
            const groupIndex = this.messages['empty'].indexOf(notification);
            if (groupIndex >= 0) {
                this.messages['empty'].splice(groupIndex, 1);
            }
        }
        this.removedSubject.next(notification);
    }

    public async(processingText: string, doneText: string, errorText?: string): AsyncAction {
        const action = new AsyncAction();
        const loadingMessage: Notification = { type: 'none', text: processingText, loading: true, group: 'content' };
        this.add(loadingMessage);
        action.event.subscribe({
            next: () => {
                this.remove(loadingMessage);
                this.success(doneText, { icon: NotificationService.defaults.successIcon, group: 'content' });
            },
            error: (error: string, options?: { timeout: 10000 } | Partial<Notification>) => {
                this.remove(loadingMessage);
                this.error(error ?? errorText ?? 'Could not execute action due to an unexpected network issue. Please retry or contact the support team.', options);
            }
        });
        return action;
    }

    public error(message: { timeout: 0 } | Partial<Notification>): NotificationRef
    public error(text: string, options?: { timeout: 0 } | Partial<Notification>): NotificationRef
    public error(textOrOptions: string | Partial<Notification>, optionsFallback?: Partial<Notification>): NotificationRef {
        const options: Partial<Notification> = typeof textOrOptions === 'object' ? textOrOptions : optionsFallback ?? {};
        const text = typeof textOrOptions === 'string' ? textOrOptions : options.text;
        const notification: Notification = { timeout: 0, ...options, type: 'error', text };
        const ref = this.add(notification);
        this.erroredSubject.next(notification);
        return ref;
    }

    public warning(message: { timeout: 2000 } | Partial<Notification>): NotificationRef
    public warning(text: string, options?: { timeout: 2000 } | Partial<Notification>): NotificationRef
    public warning(textOrOptions: string | Partial<Notification>, optionsFallback?: Partial<Notification>): NotificationRef {
        const options: Partial<Notification> = typeof textOrOptions === 'object' ? textOrOptions : optionsFallback ?? {};
        const text = typeof textOrOptions === 'string' ? textOrOptions : options.text;
        const notification: Notification = { timeout: 2000, ...options, type: 'warning', text };
        const ref = this.add(notification);
        this.warnedSubject.next(notification);
        return ref;
    }

    public success(message: { timeout: 2000 } | Partial<Notification>): NotificationRef
    public success(text: string, options?: { timeout: 2000 } | Partial<Notification>): NotificationRef
    public success(textOrOptions: string | Partial<Notification>, optionsFallback?: Partial<Notification>): NotificationRef {
        const options: Partial<Notification> = typeof textOrOptions === 'object' ? textOrOptions : optionsFallback ?? {};
        const text = typeof textOrOptions === 'string' ? textOrOptions : options.text;
        const notification: Notification = { timeout: 2000, ...options, type: 'success', text };
        const ref = this.add(notification);
        this.succeededSubject.next(notification);
        return ref;
    }

    public positive(message: { timeout: 2000 } | Partial<Notification>): NotificationRef
    public positive(text: string, options?: { timeout: 2000 } | Partial<Notification>): NotificationRef
    public positive(textOrOptions: string | Partial<Notification>, optionsFallback?: Partial<Notification>): NotificationRef {
        const options: Partial<Notification> = typeof textOrOptions === 'object' ? textOrOptions : optionsFallback ?? {};
        const text = typeof textOrOptions === 'string' ? textOrOptions : options.text;
        const notification: Notification = { timeout: 2000, ...options, type: 'positive', text };
        const ref = this.add(notification);
        this.positivedSubject.next(notification);
        return ref;
    }

    public info(message: { timeout: 2000 } | Partial<Notification>): NotificationRef
    public info(text: string, options?: { timeout: 2000 } | Partial<Notification>): NotificationRef
    public info(textOrOptions: string | Partial<Notification>, optionsFallback?: Partial<Notification>): NotificationRef {
        const options: Partial<Notification> = typeof textOrOptions === 'object' ? textOrOptions : optionsFallback ?? {};
        const text = typeof textOrOptions === 'string' ? textOrOptions : options.text;
        const notification: Notification = { timeout: 2000, ...options, type: 'info', text };
        const ref = this.add(notification);
        this.positivedSubject.next(notification);
        return ref;
    }
}
