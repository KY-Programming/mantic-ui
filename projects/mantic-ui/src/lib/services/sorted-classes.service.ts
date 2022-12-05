import { ElementRef, inject, Injectable } from '@angular/core';

interface Entry {
    key: string;
    order: number;
    value: string;
    fixed?: boolean;
    ignore?: boolean;
    previous?: string[];
}

@Injectable()
export class SortedClassesService {
    private readonly entries = new Map<string, Entry>();
    private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    public register(...keys: string[]): SortedClassesService {
        for (const key of keys) {
            this.registerEntry(key);
        }
        return this;
    }

    public registerFixed(...keys: string[]): SortedClassesService {
        for (const key of keys) {
            this.registerEntry(key, { fixed: true });
        }
        return this;
    }

    public ignore(...keys: string[]): SortedClassesService {
        for (const key of keys) {
            this.registerEntry(key, { ignore: true });
        }
        return this;
    }

    private registerEntry(key: string, options?: Partial<Entry>): void {
        if (!key) {
            return;
        }
        if (this.has(key)) {
            console.warn(`'${key}' is already registered on <${this.elementRef.nativeElement.tagName}>.`);
        }
        const entry: Entry = {
            ...options,
            key: key.toLocaleLowerCase(),
            value: options?.fixed ? key : options?.value ?? '',
            order: this.entries.size
        };
        this.entries.set(entry.key, entry);
    }

    private getEntry(key: string): Entry | undefined {
        key = key.toLocaleLowerCase();
        return this.entries.get(key);
    }

    public set(key: string, value: unknown, options?: { refresh: boolean }): SortedClassesService {
        let entry = this.getEntry(key);
        if (!entry) {
            console.warn(`Set an unregistered value '${key}' on <${this.elementRef.nativeElement.tagName}> is not recommended. Call register(key) method once, before using set(...) method.`);
            entry = this.register(key).getEntry(key);
        }
        if (entry.fixed) {
            console.error(`Can not change an fixed value '${key} on <${this.elementRef.nativeElement.tagName}>. Use register(key) instead of registerFixed(key)`);
            return this;
        }
        if (value === true) {
            entry.value = key;
        } else if (value === false || value === undefined) {
            entry.value = '';
        } else {
            entry.value = value.toString();
        }
        if (options?.refresh !== false) {
            this.updateEntry(entry);
        }
        return this;
    }

    public get(key: string): unknown {
        return this.getEntry(key)?.value;
    }

    public has(key: string): boolean {
        return !!this.getEntry(key);
    }

    public toString(): string {
        return Array.from(this.entries.values())
            .sort(SortedClassesService.sortByOrder)
            .map(entry => entry.value)
            .filter(value => value)
            .join(' ');
    }

    public update(): void {
        Array.from(this.entries.values())
            .filter(entry => !entry.ignore)
            .sort(SortedClassesService.sortByOrder)
            .forEach(entry => this.updateEntry(entry));
    }

    private updateEntry(entry: Entry): void {
        const classList = this.elementRef.nativeElement.classList;
        if (entry.previous) {
            classList.remove(...entry.previous);
        }
        const values = entry.value.split(' ').filter(x => !!x);
        classList.add(...values);
        entry.previous = values;
    }

    private static sortByOrder(left: Entry, right: Entry): number {
        return left.order > right.order ? 1 : left.order < right.order ? -1 : 0;
    }
}
