import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SemanticUiModule } from '@mantic-ui/semantic-ui-angular';
import { SemanticButtonComponent } from './button/button.component';
import { SemanticDividerComponent } from './divider/divider.component';
import { SemanticDropdownComponent } from './dropdown/dropdown.component';
import { SemanticInputComponent } from './input/input.component';
import { SemanticLayoutComponent } from './layout/layout.component';
import { SemanticStartComponent } from './start/start.component';

@NgModule({
    declarations: [
        SemanticStartComponent,
        SemanticInputComponent,
        SemanticButtonComponent,
        SemanticDividerComponent,
        SemanticLayoutComponent,
        SemanticDropdownComponent
    ],
    imports: [
        FormsModule,
        RouterModule,
        SemanticUiModule
    ],
    exports: [
        SemanticStartComponent,
        SemanticInputComponent,
        SemanticButtonComponent,
        SemanticDividerComponent,
        SemanticLayoutComponent
    ]
})
export class SemanticModule { }
