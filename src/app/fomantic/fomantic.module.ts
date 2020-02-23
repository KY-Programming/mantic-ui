import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FomanticUiModule } from 'projects/fomantic-ui/src/public-api';
import { ManticUiDocModule } from 'projects/mantic-ui-doc/src/public-api';
import { FomanticButtonComponent } from './button/button.component';
import { FomanticDividerComponent } from './divider/divider.component';
import { FomanticInputComponent } from './input/input.component';
import { FomanticLayoutComponent } from './layout/layout.component';
import { FomanticStartComponent } from './start/start.component';

@NgModule({
    declarations: [
        FomanticStartComponent,
        FomanticInputComponent,
        FomanticButtonComponent,
        FomanticDividerComponent,
        FomanticLayoutComponent
    ],
    imports: [
        FormsModule,
        RouterModule,
        FomanticUiModule,
        ManticUiDocModule
    ],
    exports: [
        FomanticStartComponent,
        FomanticInputComponent,
        FomanticButtonComponent,
        FomanticDividerComponent,
        FomanticLayoutComponent
    ]
})
export class FomanticModule { }
