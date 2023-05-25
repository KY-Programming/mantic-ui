import { NgModule } from '@angular/core';
import { ManticUiModule } from '@mantic-ui/angular';
import { FomanticUiThemeComponent } from './fomantic-ui-theme/fomantic-ui-theme.component';

@NgModule({
    imports: [
        ManticUiModule,
        FomanticUiThemeComponent
    ],
    exports: [
        ManticUiModule,
        FomanticUiThemeComponent
    ]
})
export class FomanticUiModule {}
