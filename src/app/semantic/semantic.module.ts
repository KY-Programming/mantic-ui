import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ManticUiDocModule } from '@mantic-ui/angular-doc';
import { SemanticUiModule } from '@mantic-ui/semantic-ui-angular';
import { SemanticLayoutComponent } from './layout.component';
import { SemanticStartComponent } from './start/start.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        SemanticStartComponent,
        SemanticLayoutComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        SemanticUiModule,
        ManticUiDocModule,
        FontAwesomeModule
    ],
    exports: []
})
export class SemanticModule {}
