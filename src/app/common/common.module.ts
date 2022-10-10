import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { CommonLayoutComponent } from './layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SemanticUiModule } from '@mantic-ui/semantic-ui-angular';
import { ManticUiDocModule } from '@mantic-ui/angular-doc';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        CommonLayoutComponent
    ],
    imports: [
        AngularCommonModule,
        RouterModule,
        SemanticUiModule,
        ManticUiDocModule,
        FontAwesomeModule
    ]
})
export class CommonModule {}
