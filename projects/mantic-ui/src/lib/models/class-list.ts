export class ClassList {
    private readonly entries = new Map<string, string>();
    private readonly order: string[] = [];

    public constructor(
        private readonly tag?: string
    ) {
    }

    public register(...keys: string[]): ClassList {
        for (const key of keys) {
            this.order.push(key.toLocaleLowerCase());
            this.entries.set(key.toLocaleLowerCase(), undefined);
        }
        return this;
    }

    public set(key: string, value: unknown): ClassList {
        if (this.order.indexOf(key.toLocaleLowerCase()) === -1) {
            console.warn(`Set an unregistered value (${this.tag}.${key}) is not recommended. Call register(key) method once, before using set(...) method.`);
        }
        if (value === true) {
            this.entries.set(key.toLocaleLowerCase(), key);
        }
        else if (value === false || value === undefined) {
            this.entries.set(key.toLocaleLowerCase(), undefined);
        }
        else {
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
}
