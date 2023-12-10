import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

export function provideHighlightJs(): EnvironmentProviders {
    return makeEnvironmentProviders([
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                coreLibraryLoader: () => import('highlight.js/lib/core'),
                languages: getHighlightLanguages()
            }
        }
    ]);
}

export function getHighlightLanguages(): unknown {
    return {
        cs: () => import('highlight.js/lib/languages/csharp'),
        css: () => import('highlight.js/lib/languages/css'),
        html: () => import('highlight.js/lib/languages/xml'),
        js: () => import('highlight.js/lib/languages/javascript'),
        scss: () => import('highlight.js/lib/languages/scss'),
        ts: () => import('highlight.js/lib/languages/typescript'),
        json: () => import('highlight.js/lib/languages/json')
    };
}
