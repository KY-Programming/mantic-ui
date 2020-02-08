import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ManticUiModule } from '@mantic-ui/angular';
import { FomanticUiThemeComponent } from './fomantic-ui-theme/fomantic-ui-theme.component';

@NgModule({
  declarations: [
    FomanticUiThemeComponent
  ],
  imports: [
    CommonModule,
    ManticUiModule
  ],
  exports: [
    ManticUiModule,
    FomanticUiThemeComponent
  ]
})
export class FomanticUiModule { }
