import { DOCUMENT, inject, InjectionToken, Service } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { filter } from 'rxjs';
import { ManticMeta, manticMetaKey } from './mantic-meta';
import { ManticMetaConfiguration } from './mantic-meta-configuration';

export const manticMetaConfigurationToken = new InjectionToken<ManticMetaConfiguration>('manticMetaConfiguration');

/**
 * Keeps the meta tags of the document in line with the active route: description, canonical url, robots, Open Graph and
 * the Twitter card. Started by `provideManticMeta(...)`. Tags that are already in the index.html (static defaults) are
 * updated in place, not duplicated.
 */
@Service()
export class ManticMetaService {
    private readonly router = inject(Router);
    private readonly titleStrategy = inject(TitleStrategy);
    private readonly meta = inject(Meta);
    private readonly document = inject(DOCUMENT);
    private readonly configuration = inject(manticMetaConfigurationToken, { optional: true }) ?? {};
    // What the index.html says, restored when a page without noindex follows one with it
    private readonly initialRobots = this.meta.getTag('name="robots"')?.content;
    private isStarted = false;

    public start(): void {
        if (this.isStarted) {
            return;
        }
        this.isStarted = true;
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => this.update(this.router.routerState.snapshot));
    }

    public update(snapshot: RouterStateSnapshot): void {
        const pageMeta = this.collect(snapshot.root);
        const title = pageMeta.title ?? this.titleStrategy.buildTitle(snapshot) ?? this.configuration.siteName;
        const description = pageMeta.description ?? this.configuration.description;
        const image = pageMeta.image ?? this.configuration.image;
        const canonical = pageMeta.isNoIndex ? undefined : this.getCanonical(pageMeta.canonical ?? snapshot.url);

        this.setRobots(pageMeta.isNoIndex ? 'noindex' : this.initialRobots);
        this.setCanonical(canonical);
        this.setTag('name', 'description', description);
        this.setTag('property', 'og:title', title);
        this.setTag('property', 'og:description', description);
        this.setTag('property', 'og:url', canonical);
        this.setTag('property', 'og:type', pageMeta.type ?? this.configuration.type ?? 'website');
        this.setTag('property', 'og:image', image ? this.toAbsolute(image) : undefined);
        this.setTag('property', 'og:site_name', this.configuration.siteName);
        this.setTag('property', 'og:locale', this.configuration.locale);
        this.setAlternateLocales(this.configuration.alternateLocales ?? []);
        this.setTag('name', 'twitter:card', this.configuration.twitterCard ?? (image ? 'summary_large_image' : 'summary'));
    }

    /** The meta of every route from the root down to the active one, the deepest wins */
    private collect(root: ActivatedRouteSnapshot): ManticMeta {
        const merged: ManticMeta = {};
        let route: ActivatedRouteSnapshot | null = root;
        while (route) {
            const routeMeta = route.data[manticMetaKey] as ManticMeta | undefined;
            if (routeMeta) {
                Object.assign(merged, Object.fromEntries(Object.entries(routeMeta).filter(([, value]) => value !== undefined)));
            }
            route = route.firstChild;
        }
        return merged;
    }

    private getCanonical(url: string): string | undefined {
        // The router's url keeps query and fragment, a canonical url names the page without them
        const path = url.split(/[?#]/, 1)[0] || '/';
        const canonicalPath = this.configuration.canonical ? this.configuration.canonical(path) : path;
        return canonicalPath === undefined ? undefined : this.toAbsolute(canonicalPath);
    }

    /** Resolves a path against the base href: '/projects' below <base href="/de/"> is https://host/de/projects */
    private toAbsolute(path: string): string {
        // An absolute url (https://..., data:...) stays as it is
        return /^[a-z][a-z0-9+.-]*:/i.test(path) ? path : new URL(path.replace(/^\/+/, ''), this.document.baseURI).href;
    }

    private setTag(attribute: 'name' | 'property', key: string, content: string | undefined): void {
        const selector = `${attribute}="${key}"`;
        if (!content) {
            this.meta.removeTag(selector);
            return;
        }
        const definition: MetaDefinition = { [attribute]: key, content };
        this.meta.updateTag(definition, selector);
    }

    private setRobots(content: string | undefined): void {
        this.setTag('name', 'robots', content);
    }

    private setAlternateLocales(locales: string[]): void {
        const selector = 'property="og:locale:alternate"';
        const current = this.meta.getTags(selector).map(element => element.content);
        if (current.length === locales.length && current.every((locale, index) => locale === locales[index])) {
            return;
        }
        for (const element of this.meta.getTags(selector)) {
            element.remove();
        }
        this.meta.addTags(locales.map(locale => ({ property: 'og:locale:alternate', content: locale })));
    }

    private setCanonical(href: string | undefined): void {
        let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (!href) {
            link?.remove();
            return;
        }
        if (!link) {
            link = this.document.createElement('link');
            link.rel = 'canonical';
            this.document.head.append(link);
        }
        link.href = href;
    }
}
