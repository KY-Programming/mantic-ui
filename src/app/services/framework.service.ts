import { computed, inject, Service } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

export type Framework = 'semantic' | 'fomantic' | 'mantic';

const frameworkPattern = /^\/(semantic|fomantic|mantic)(\/|$)/;
const defaultFramework: Framework = 'fomantic';

/** The documentation is mounted once per framework (`/semantic`, `/fomantic`, `/mantic`); links between shared pages have to stay inside the current one */
@Service()
export class FrameworkService {
    private readonly router = inject(Router);
    private readonly url = toSignal(
        this.router.events.pipe(filter(event => event instanceof NavigationEnd), map(() => this.router.url)),
        { initialValue: this.router.url }
    );

    public readonly current = computed(() => FrameworkService.parse(this.url()) ?? defaultFramework);

    /** Absolute route prefix of the current framework, use it as first command: `[routerLink]="[framework.prefix(), 'button']"` */
    public readonly prefix = computed(() => '/' + this.current());

    /** Same url in another framework. Needs a full reload: the theme styles are global and must not mix */
    public switchTo(framework: Framework): void {
        const url = this.router.url;
        const current = FrameworkService.parse(url);
        const path = current ? url.slice(current.length + 1) : url;
        globalThis.location.assign(`/${framework}${path}`);
    }

    private static parse(url: string): Framework | undefined {
        return frameworkPattern.exec(url)?.[1] as Framework | undefined;
    }
}
