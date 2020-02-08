import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SemanticUiModule } from 'projects/semantic-ui/src/public-api';
import { SemanticButtonComponent } from './button/button.component';
import { SemanticContainerComponent } from './container/container.component';
import { SemanticDividerComponent } from './divider/divider.component';
import { SemanticDropdownComponent } from './dropdown/dropdown.component';
import { SemanticInputComponent } from './input/input.component';
import { SemanticLayoutComponent } from './layout/layout.component';
import { SemanticMenuComponent } from './menu/menu.component';
import { SemanticSegmentComponent } from './segment/segment.component';
import { SemanticStartComponent } from './start/start.component';
import { SemanticTabComponent } from './tab/tab.component';

@NgModule({
    declarations: [
        SemanticStartComponent,
        SemanticInputComponent,
        SemanticButtonComponent,
        SemanticDividerComponent,
        SemanticLayoutComponent,
        SemanticDropdownComponent,
        SemanticTabComponent,
        SemanticMenuComponent,
        SemanticSegmentComponent,
        SemanticContainerComponent
    ],
    imports: [
        FormsModule,
        RouterModule,
        SemanticUiModule
    ],
    exports: [
    ]
})
export class SemanticModule { }
