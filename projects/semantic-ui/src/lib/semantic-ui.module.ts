import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ManticUiModule } from 'projects/mantic-ui/src/public-api';
import { SemanticUiThemeComponent } from './semantic-ui-theme/semantic-ui-theme.component';

@NgModule({
  declarations: [
    SemanticUiThemeComponent
  ],
  imports: [
    CommonModule,
    ManticUiModule
  ],
  exports: [
    ManticUiModule,
    SemanticUiThemeComponent
  ]
})
export class SemanticUiModule { }
