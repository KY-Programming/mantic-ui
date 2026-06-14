import { Service, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { IconType } from '../../icon/models/icon-type';
import { AsyncAction } from '../models/async-action';
import { Notification } from '../models/notification';
import { NotificationHandler } from '../models/notification-handler';
import { NotificationRef as NotificationReference } from '../models/notification-ref';

@Service()
export class NotificationService implements NotificationHandler {
    public static readonly defaults = {
        successIcon: signal<IconType>('check')
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

    public add(notification: Notification): NotificationReference {
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
        return new NotificationReference(notification, this);
    }

    public remove(notification: Notification): void {
        const index = this.messages['all'].indexOf(notification);
        if (index !== -1) {
            this.messages['all'].splice(index, 1);
        }
        if (notification.group) {
            const groupIndex = this.messages[notification.group].indexOf(notification);
            if (groupIndex !== -1) {
                this.messages[notification.group].splice(groupIndex, 1);
            }
        }
        else {
            const groupIndex = this.messages['empty'].indexOf(notification);
            if (groupIndex !== -1) {
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
                this.success(doneText, { icon: NotificationService.defaults.successIcon(), group: 'content' });
            },
            error: (error: string | undefined, options?: { timeout: 10_000 } | Partial<Notification>) => {
                this.remove(loadingMessage);
                this.error(error ?? errorText ?? 'Could not execute action due to an unexpected network issue. Please retry or contact the support team.', options);
            }
        });
        return action;
    }

    public error(message: { timeout: 0 } | Partial<Notification>): NotificationReference
    public error(text: string, options?: { timeout: 0 } | Partial<Notification>): NotificationReference
    public error(textOrOptions: string | Partial<Notification>, optionsFallback?: Partial<Notification>): NotificationReference {
        const options: Partial<Notification> = typeof textOrOptions === 'object' ? textOrOptions : optionsFallback ?? {};
        const text = typeof textOrOptions === 'string' ? textOrOptions : options.text;
        const notification: Notification = { timeout: 0, ...options, type: 'error', text };
        const reference = this.add(notification);
        this.erroredSubject.next(notification);
        return reference;
    }

    public warning(message: { timeout: 2000 } | Partial<Notification>): NotificationReference
    public warning(text: string, options?: { timeout: 2000 } | Partial<Notification>): NotificationReference
    public warning(textOrOptions: string | Partial<Notification>, optionsFallback?: Partial<Notification>): NotificationReference {
        const options: Partial<Notification> = typeof textOrOptions === 'object' ? textOrOptions : optionsFallback ?? {};
        const text = typeof textOrOptions === 'string' ? textOrOptions : options.text;
        const notification: Notification = { timeout: 2000, ...options, type: 'warning', text };
        const reference = this.add(notification);
        this.warnedSubject.next(notification);
        return reference;
    }

    public success(message: { timeout: 2000 } | Partial<Notification>): NotificationReference
    public success(text: string, options?: { timeout: 2000 } | Partial<Notification>): NotificationReference
    public success(textOrOptions: string | Partial<Notification>, optionsFallback?: Partial<Notification>): NotificationReference {
        const options: Partial<Notification> = typeof textOrOptions === 'object' ? textOrOptions : optionsFallback ?? {};
        const text = typeof textOrOptions === 'string' ? textOrOptions : options.text;
        const notification: Notification = { timeout: 2000, ...options, type: 'success', text };
        const reference = this.add(notification);
        this.succeededSubject.next(notification);
        return reference;
    }

    public positive(message: { timeout: 2000 } | Partial<Notification>): NotificationReference
    public positive(text: string, options?: { timeout: 2000 } | Partial<Notification>): NotificationReference
    public positive(textOrOptions: string | Partial<Notification>, optionsFallback?: Partial<Notification>): NotificationReference {
        const options: Partial<Notification> = typeof textOrOptions === 'object' ? textOrOptions : optionsFallback ?? {};
        const text = typeof textOrOptions === 'string' ? textOrOptions : options.text;
        const notification: Notification = { timeout: 2000, ...options, type: 'positive', text };
        const reference = this.add(notification);
        this.positivedSubject.next(notification);
        return reference;
    }

    public info(message: { timeout: 2000 } | Partial<Notification>): NotificationReference
    public info(text: string, options?: { timeout: 2000 } | Partial<Notification>): NotificationReference
    public info(textOrOptions: string | Partial<Notification>, optionsFallback?: Partial<Notification>): NotificationReference {
        const options: Partial<Notification> = typeof textOrOptions === 'object' ? textOrOptions : optionsFallback ?? {};
        const text = typeof textOrOptions === 'string' ? textOrOptions : options.text;
        const notification: Notification = { timeout: 2000, ...options, type: 'info', text };
        const reference = this.add(notification);
        this.positivedSubject.next(notification);
        return reference;
    }
}
