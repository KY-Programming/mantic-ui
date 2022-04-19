import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FomanticUiModule } from '@mantic-ui/fomantic-ui-angular';
import { ManticUiDocModule } from '@mantic-ui/angular-doc';
import { FomanticButtonComponent } from './button/button.component';
import { FomanticDividerComponent } from './divider/divider.component';
import { FomanticInputComponent } from './input/input.component';
import { FomanticLayoutComponent } from './layout/layout.component';
import { FomanticStartComponent } from './start/start.component';
import { SemanticUiModule } from '@mantic-ui/semantic-ui-angular';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        FomanticButtonComponent,
        FomanticDividerComponent,
        FomanticInputComponent,
        FomanticLayoutComponent,
        FomanticStartComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        FomanticUiModule,
        ManticUiDocModule,
        SemanticUiModule
    ],
    exports: [
        FomanticStartComponent,
        FomanticInputComponent,
        FomanticButtonComponent,
        FomanticDividerComponent,
        FomanticLayoutComponent
    ]
})
export class FomanticModule {
}
