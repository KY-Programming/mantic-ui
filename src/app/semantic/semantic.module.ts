import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ManticUiDocModule } from '@mantic-ui/angular-doc';
import { SemanticUiModule } from '@mantic-ui/semantic-ui-angular';
import { SemanticButtonComponent } from './button/button.component';
import { SemanticCheckboxComponent } from './checkbox/checkbox.component';
import { SemanticContainerComponent } from './container/container.component';
import { SemanticDimmerComponent } from './dimmer/dimmer.component';
import { SemanticDividerComponent } from './divider/divider.component';
import { SemanticDropdownComponent } from './dropdown/dropdown.component';
import { SemanticFormComponent } from './form/form.component';
import { SemanticGridComponent } from './grid/grid.component';
import { SemanticHeaderComponent } from './header/header.component';
import { SemanticIframeComponent } from './iframe/iframe.component';
import { SemanticInputComponent } from './input/input.component';
import { SemanticLayoutIframeComponent } from './layout/iframe/layout/layout.component';
import { SemanticLayoutComponent } from './layout/layout.component';
import { SemanticMenuIframeFixed1Component } from './menu/iframe/fixed1/fixed1.component';
import { SemanticMenuComponent } from './menu/menu.component';
import { SemanticModalComponent } from './modal/modal.component';
import { SemanticOuterComponent } from './outer/outer.component';
import { SemanticRadioComponent } from './radio/radio.component';
import { SemanticSegmentComponent } from './segment/segment.component';
import { SemanticSliderComponent } from './slider/slider.component';
import { SemanticStartComponent } from './start/start.component';
import { SemanticTabComponent } from './tab/tab.component';
import { SemanticToggleComponent } from './toggle/toggle.component';
import { MyValidationPipe } from './form/my-validation.pipe';
import { SemanticLicenseComponent } from './license/license.component';
import { SemanticCreditsComponent } from './credits/credits.component';
import { SemanticExpanderComponent } from './expander/expander.component';
import { HelpersModule } from '../helpers/helpers.module';
import { SemanticContextMenuComponent } from './context-menu/context-menu.component';
import { SemanticMessageComponent } from './message/message.component';
import { SemanticElementsComponent } from './elements/elements.component';
import { SemanticElementListComponent } from './element-list/element-list.component';
import { SemanticComponentsComponent } from './components/components.component';
import { SemanticLayoutsComponent } from './layouts/layouts.component';
import { SemanticLayoutListComponent } from './layout-list/layout-list.component';
import { SemanticSpecialsComponent } from './specials/specials.component';
import { SemanticSpecialListComponent } from './special-list/special-list.component';
import { SemanticUtilsComponent } from './utils/utils.component';
import { SemanticUtilListComponent } from './util-list/util-list.component';
import { SemanticNotificationComponent } from './notification/notification.component';
import { SemanticChatComponent } from './chat/chat.component';
import { HelpComponent } from './help/help.component';
import { HeaderComponent } from '../helpers/header/header.component';
import { FeatureComponent } from './help/feature/feature.component';

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
        SemanticToggleComponent,
        SemanticRadioComponent,
        SemanticSliderComponent,
        SemanticGridComponent,
        SemanticFormComponent,
        MyValidationPipe,
        SemanticLicenseComponent,
        SemanticCreditsComponent,
        SemanticExpanderComponent,
        SemanticContextMenuComponent,
        SemanticMessageComponent,
        SemanticElementsComponent,
        SemanticElementListComponent,
        SemanticComponentsComponent,
        SemanticLayoutsComponent,
        SemanticLayoutListComponent,
        SemanticSpecialsComponent,
        SemanticSpecialListComponent,
        SemanticUtilsComponent,
        SemanticUtilListComponent,
        SemanticNotificationComponent,
        SemanticChatComponent,
        HelpComponent,
        HeaderComponent,
        FeatureComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        SemanticUiModule,
        ManticUiDocModule,
        HelpersModule
    ],
    exports: [
    ]
})
export class SemanticModule { }
