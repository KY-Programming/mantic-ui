import { provideHttpClient, withXhr } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ButtonComponent, provideDynamicComponent, provideManticMeta, provideManticTitleStrategy } from '@mantic-ui/angular';
import { provideHighlightJs } from '@mantic-ui/angular-doc';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withXhr()),
        provideManticTitleStrategy({
            postfix: ' - mantic UI',
            fallback: 'mantic UI',
            conditions: [
                { condition: '/semantic', fallback: 'Semantic UI Angular - mantic UI', postfix: ' - Semantic UI Angular - mantic UI' },
                { condition: '/fomantic', fallback: 'Fomantic UI Angular - mantic UI', postfix: ' - Fomantic UI Angular - mantic UI' },
                { condition: '/mantic', fallback: 'mantic Theme - mantic UI', postfix: ' - mantic Theme - mantic UI' }
            ]
        }),
        provideManticMeta({
            siteName: 'mantic UI',
            description: 'Angular components for Semantic UI and Fomantic UI, with the native mantic theme.',
            locale: 'en_US',
            // /semantic/ and /fomantic/ show the examples of /mantic/ with another theme: the sitemap only lists /mantic/
            canonical: path => path.replace(/^\/(semantic|fomantic)(?=\/|$)/, '/mantic')
        }),
        provideHighlightJs(),
        provideDynamicComponent(ButtonComponent)
    ]
};
