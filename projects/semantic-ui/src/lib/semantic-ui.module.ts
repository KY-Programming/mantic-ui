import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ManticUiModule } from '@mantic-ui/angular';
import { SemanticUiThemeComponent } from './semantic-ui-theme/semantic-ui-theme.component';
import { SemanticUiSiteComponent } from './semantic-ui-site/semantic-ui-site.component';
import { SemanticUiResetComponent } from './semantic-ui-reset/semantic-ui-reset.component';

@NgModule({
  declarations: [
    SemanticUiThemeComponent,
    SemanticUiSiteComponent,
    SemanticUiResetComponent
  ],
  imports: [
    CommonModule,
    ManticUiModule
  ],
  exports: [
    ManticUiModule,
    SemanticUiThemeComponent,
    SemanticUiSiteComponent,
    SemanticUiResetComponent
  ]
})
export class SemanticUiModule { }
