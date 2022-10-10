import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FomanticUiModule } from '@mantic-ui/fomantic-ui-angular';
import { ManticUiDocModule } from '@mantic-ui/angular-doc';
import { FomanticLayoutComponent } from './layout.component';
import { FomanticStartComponent } from './start/start.component';
import { SemanticUiModule } from '@mantic-ui/semantic-ui-angular';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
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
        FomanticLayoutComponent
    ]
})
export class FomanticModule {
}
