import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ButtonComponent, provideDynamicComponent, provideManticTitleStrategy } from '@mantic-ui/angular';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
    providers: [
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
        provideDynamicComponent(ButtonComponent)
    ]
};
