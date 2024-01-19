import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TemplateService {
    private readonly subscriptions = new Map<string, Subject<TemplateRef<unknown> | undefined>>();
    private readonly templates = new Map<string, TemplateRef<unknown>[]>();

    public show(names: string | string[], template: TemplateRef<unknown>): void {
        names = typeof names === 'string' ? [names] : names ?? [];
        const subscriptionSubject = new BehaviorSubject<TemplateRef<unknown> | undefined>(template);
        for (const name of names) {
            let list = this.templates.get(name);
            if (!list) {
                list = [];
                this.templates.set(name, list);
            }
            const index = list.indexOf(template);
            if (index >= 0) {
                list.splice(index, 1);
            }
            list.push(template);
            this.notify(name, template, subscriptionSubject);
        }
    }

    public hide(names: string | string[], template: TemplateRef<unknown>): void {
        names = typeof names === 'string' ? [names] : names ?? [];
        for (const name of names) {
            const list = this.templates.get(name);
            if (!list) {
                continue;
            }
            const index = list.indexOf(template);
            if (index >= 0) {
                list.splice(index, 1);
            }
            this.notify(name, list[list.length - 1]);
        }
    }

    public get(names: string | string[]): Observable<TemplateRef<unknown> | undefined> {
        names = typeof names === 'string' ? [names] : names ?? [];
        const existingSubject = names.map(name => this.subscriptions.get(name)).find(subscription => subscription);
        const subject = existingSubject ?? new ReplaySubject<TemplateRef<unknown> | undefined>(1);
        for (const name of names) {
            this.subscriptions.set(name, subject);
        }
        return subject.pipe(distinctUntilChanged());
    }

    private notify(name: string, template: TemplateRef<unknown> | undefined, fallbackSubscriptionSubject?: BehaviorSubject<TemplateRef<unknown> | undefined>): void {
        if (this.subscriptions.has(name)) {
            this.subscriptions.get(name)?.next(template);
        }
        else if (fallbackSubscriptionSubject) {
            this.subscriptions.set(name, fallbackSubscriptionSubject);
        }
    }
}
