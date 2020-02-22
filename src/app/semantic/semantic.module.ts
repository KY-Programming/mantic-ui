import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SemanticUiModule } from 'projects/semantic-ui/src/public-api';
import { SemanticButtonComponent } from './button/button.component';
import { SemanticCheckboxComponent } from './checkbox/checkbox.component';
import { SemanticContainerComponent } from './container/container.component';
import { SemanticDimmerComponent } from './dimmer/dimmer.component';
import { SemanticDividerComponent } from './divider/divider.component';
import { SemanticDropdownComponent } from './dropdown/dropdown.component';
import { SemanticHeaderComponent } from './header/header.component';
import { SemanticIframeComponent } from './iframe/iframe.component';
import { SemanticInputComponent } from './input/input.component';
import { SemanticLayoutIframeComponent } from './layout/iframe/layout/layout.component';
import { SemanticLayoutComponent } from './layout/layout.component';
import { SemanticMenuIframeFixed1Component } from './menu/iframe/fixed1/fixed1.component';
import { SemanticMenuComponent } from './menu/menu.component';
import { SemanticModalComponent } from './modal/modal.component';
import { SemanticOuterComponent } from './outer/outer.component';
import { SemanticSegmentComponent } from './segment/segment.component';
import { SemanticStartComponent } from './start/start.component';
import { SemanticTabComponent } from './tab/tab.component';
import { SemanticToggleComponent } from './toggle/toggle.component';

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
        SemanticContainerComponent,
        SemanticHeaderComponent,
        SemanticMenuIframeFixed1Component,
        SemanticIframeComponent,
        SemanticOuterComponent,
        SemanticLayoutIframeComponent,
        SemanticModalComponent,
        SemanticDimmerComponent,
        SemanticCheckboxComponent,
        SemanticToggleComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        SemanticUiModule
    ],
    exports: [
    ]
})
export class SemanticModule { }
