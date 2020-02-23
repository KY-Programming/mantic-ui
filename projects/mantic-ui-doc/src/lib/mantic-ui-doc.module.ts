import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ManticUiModule } from '@mantic-ui/angular';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { ExampleCodeComponent } from './example-code/example-code.component';
import { ExampleFrameComponent } from './example-frame/example-frame.component';
import { ExampleComponent } from './example/example.component';

// tslint:disable-next-line: only-arrow-functions
export function getHighlightLanguages(): unknown {
  return {
    css: () => import('highlight.js/lib/languages/css'),
    html: () => import('highlight.js/lib/languages/xml'),
    javascript: () => import('highlight.js/lib/languages/javascript'),
    scss: () => import('highlight.js/lib/languages/scss'),
    typescript: () => import('highlight.js/lib/languages/typescript')
  };
}

@NgModule({
  declarations: [
    ExampleComponent,
    ExampleCodeComponent,
    ExampleFrameComponent
  ],
  imports: [
    CommonModule,
    HighlightModule,
    ManticUiModule
  ],
  exports: [
    ExampleComponent,
    ExampleCodeComponent,
    ExampleFrameComponent
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: getHighlightLanguages()
      }
    }
  ],
})
export class ManticUiDocModule { }
