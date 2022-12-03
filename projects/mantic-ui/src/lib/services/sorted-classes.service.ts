import { ElementRef, inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SortedClassesService {
    private readonly entries = new Map<string, string>();
    private readonly last = new Map<string, string[]>();
    private readonly order: string[] = [];
    private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    public register(...keys: string[]): SortedClassesService {
        for (const key of keys) {
            this.order.push(key.toLocaleLowerCase());
            this.entries.set(key.toLocaleLowerCase(), undefined);
        }
        return this;
    }

    public registerFixed(...keys: string[]): SortedClassesService {
        this.register(...keys);
        for (const key of keys) {
            this.set(key, true, false);
        }
        return this;
    }

    public set(key: string, value: unknown, refresh = true): SortedClassesService {
        if (this.order.indexOf(key.toLocaleLowerCase()) === -1) {
            console.warn(`Set an unregistered value '${key}' on <${this.elementRef.nativeElement.tagName}> is not recommended. Call register(key) method once, before using set(...) method.`);
        }
        if (value === true) {
            this.entries.set(key.toLocaleLowerCase(), key);
        } else if (value === false || value === undefined) {
            this.entries.set(key.toLocaleLowerCase(), undefined);
        } else {
            this.entries.set(key.toLocaleLowerCase(), value?.toString());
        }
        return this;
    }

    public get(key: string): string {
        return this.entries.get(key.toLocaleLowerCase());
    }

    public has(key: string): boolean {
        return this.entries.has(key.toLocaleLowerCase());
    }

    public toString(): string {
        const notRegisteredValues = Array.from(this.entries.keys()).filter(key => this.order.indexOf(key) === -1);
        return this.order.map(key => this.entries.get(key))
            .concat(notRegisteredValues.map(key => this.entries.get(key)))
            .filter(x => x)
            .join(' ');
    }

    public update(): void {
        for (const key of this.order) {
            this.updateEntry(key);
        }
        for (const key of Array.from(this.entries.keys()).filter(x => this.order.indexOf(x) === -1)) {
            this.updateEntry(key);
        }
    }

    private updateEntry(key: string): void {
        const classList = this.elementRef.nativeElement.classList;
        const value = this.entries.get(key);
        if (value) {
            if (this.last.has(key)) {
                this.last.get(key).forEach(x => classList.remove(x));
            }
            const values = value.split(' ').filter(x => !!x);
            classList.add(...values);
            this.last.set(key, values);
        } else if (this.last.has(key)) {
            this.last.get(key).forEach(x => classList.remove(x));
            this.last.delete(key);
        }
    }
}
