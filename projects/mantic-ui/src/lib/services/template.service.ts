import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable, ReplaySubject, Subject } from 'rxjs';
import { Template } from '../models/template';

@Injectable({
    providedIn: 'root'
})
export class TemplateService {
    private readonly subscriptions = new Map<string, Subject<Template | undefined>>();
    private readonly templates = new Map<string, Template[]>();

    public show(names: string | string[], template: Template): void {
        names = typeof names === 'string' ? [names] : names ?? [];
        const subscriptionSubject = new BehaviorSubject<Template | undefined>(template);
        for (const name of names) {
            let list = this.templates.get(name);
            if (!list) {
                list = [];
                this.templates.set(name, list);
            }
            let index = list.indexOf(template);
            if (index >= 0) {
                list.splice(index, 1);
            }
            for (const entry of list.slice()) {
                if (!entry.autoHide) {
                    continue;
                }
                entry.visible.set(false);
                index = list.indexOf(entry);
                if (index >= 0) {
                    list.splice(index, 1);
                }
            }
            list.push(template);
            template.visible.set(true);
            this.notify(name, template, subscriptionSubject);
        }
    }

    public hide(names: string | string[], template: Template): void {
        names = typeof names === 'string' ? [names] : names ?? [];
        for (const name of names) {
            const list = this.templates.get(name);
            if (!list) {
                continue;
            }
            const index = list.indexOf(template);
            if (index >= 0) {
                const template = list.splice(index, 1)[0];
                template.visible.set(false);
            }
            const lastTemplate = list[list.length - 1];
            lastTemplate?.visible.set(true);
            this.notify(name, lastTemplate);
        }
    }

    public toggle(names: string | string[], template: Template): void {
        names = typeof names === 'string' ? [names] : names ?? [];
        for (const name of names) {
            const list = this.templates.get(name);
            const index = list?.indexOf(template);
            if (list && index !== undefined && index >= 0) {
                this.hide(name, template);
            }
            else {
                this.show(name, template);
            }
        }
    }

    public get(names: string | string[]): Observable<Template | undefined> {
        names = typeof names === 'string' ? [names] : names ?? [];
        const existingSubject = names.map(name => this.subscriptions.get(name)).find(subscription => subscription);
        const subject = existingSubject ?? new ReplaySubject<Template | undefined>(1);
        for (const name of names) {
            this.subscriptions.set(name, subject);
        }
        return subject.pipe(distinctUntilChanged());
    }

    private notify(name: string, template: Template | undefined, fallbackSubscriptionSubject?: BehaviorSubject<Template | undefined>): void {
        if (this.subscriptions.has(name)) {
            this.subscriptions.get(name)?.next(template);
        }
        else if (fallbackSubscriptionSubject) {
            this.subscriptions.set(name, fallbackSubscriptionSubject);
        }
    }
}
