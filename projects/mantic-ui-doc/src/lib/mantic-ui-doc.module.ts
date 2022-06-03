import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ManticUiModule } from '@mantic-ui/angular';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import { ExampleCodeComponent } from './example-code/example-code.component';
import { ExampleFrameComponent } from './example-frame/example-frame.component';
import { ExampleComponent } from './example/example.component';
import { NugetInstallComponent } from './nuget-install/nuget-install.component';
import { NugetComponent } from './nuget/nuget.component';
import { NpmComponent } from './npm/npm.component';
import { NpmInstallComponent } from './npm-install/npm-install.component';

// tslint:disable-next-line: only-arrow-functions
export function getHighlightLanguages(): unknown {
    return {
        cs: () => import('highlight.js/lib/languages/csharp'),
        css: () => import('highlight.js/lib/languages/css'),
        html: () => import('highlight.js/lib/languages/xml'),
        js: () => import('highlight.js/lib/languages/javascript'),
        scss: () => import('highlight.js/lib/languages/scss'),
        ts: () => import('highlight.js/lib/languages/typescript')
    };
}

@NgModule({
    declarations: [
        ExampleComponent,
        ExampleCodeComponent,
        ExampleFrameComponent,
        NugetComponent,
        NugetInstallComponent,
        NpmComponent,
        NpmInstallComponent
    ],
    imports: [
        CommonModule,
        HighlightModule,
        ManticUiModule
    ],
    exports: [
        ExampleComponent,
        ExampleCodeComponent,
        ExampleFrameComponent,
        NugetComponent,
        NugetInstallComponent,
        NpmComponent,
        NpmInstallComponent
    ],
    providers: [
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                coreLibraryLoader: () => import('highlight.js/lib/core'),
                languages: getHighlightLanguages()
            }
        }
    ]
})
export class ManticUiDocModule {}
