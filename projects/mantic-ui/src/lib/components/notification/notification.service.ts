import { Injectable } from '@angular/core';
import { Notification } from './notification';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
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

    public add(message: Notification): void {
        this.messages['all'].push(message);
        if (message.group) {
            this.get(message.group).push(message);
        } else {
            this.messages['empty'].push(message);
        }
        this.addedSubject.next(message);
        if (message && message.timeout > 0) {
            setTimeout(() => this.remove(message), message.timeout);
        }
    }

    public remove(message: Notification): void {
        const index = this.messages['all'].indexOf(message);
        if (index >= 0) {
            this.messages['all'].splice(index, 1);
        }
        if (message.group) {
            const groupIndex = this.messages[message.group].indexOf(message);
            if (groupIndex >= 0) {
                this.messages[message.group].splice(groupIndex, 1);
            }
        } else {
            const groupIndex = this.messages['empty'].indexOf(message);
            if (groupIndex >= 0) {
                this.messages['empty'].splice(groupIndex, 1);
            }
        }
        this.removedSubject.next(message);
    }

    public error(text: string, options?: { timeout: 0 } | Partial<Notification>): void {
        const notification: Notification = { timeout: 0, ...options, type: 'error', text };
        this.add(notification);
        this.erroredSubject.next(notification);
    }

    public warning(text: string, options?: { timeout: 2000 } | Partial<Notification>): void {
        const notification: Notification = { timeout: 2000, ...options, type: 'warning', text };
        this.add(notification);
        this.warnedSubject.next(notification);
    }

    public success(text: string, options?: { timeout: 2000 } | Partial<Notification>): void {
        const notification: Notification = { timeout: 2000, ...options, type: 'success', text };
        this.add(notification);
        this.succeededSubject.next(notification);
    }

    public positive(text: string, options?: { timeout: 2000 } | Partial<Notification>): void {
        const notification: Notification = { timeout: 2000, ...options, type: 'positive', text };
        this.add(notification);
        this.positivedSubject.next(notification);
    }

    public info(text: string, options?: { timeout: 2000 } | Partial<Notification>): void {
        const notification: Notification = { timeout: 2000, ...options, type: 'info', text };
        this.add(notification);
        this.positivedSubject.next(notification);
    }
}
