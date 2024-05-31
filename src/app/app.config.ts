import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ButtonComponent, provideDynamicComponent, provideManticTitleStrategy } from '@mantic-ui/angular';
import { provideHighlightJs } from '@mantic-ui/angular-doc';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(),
        provideManticTitleStrategy({
            postfix: ' - mantic UI',
            fallback: 'mantic UI',
            conditions: [
                { condition: '/semantic', fallback: 'Semantic UI Angular - mantic UI', postfix: ' - Semantic UI Angular - mantic UI' },
                { condition: '/fomantic', fallback: 'Fomantic UI Angular - mantic UI', postfix: ' - Fomantic UI Angular - mantic UI' }
            ]
        }),
        provideHighlightJs(),
        provideDynamicComponent(ButtonComponent)
    ]
};
