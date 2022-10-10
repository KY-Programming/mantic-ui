import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FomanticModule } from './fomantic/fomantic.module';
import { SemanticModule } from './semantic/semantic.module';
import { ManticTitleStrategy, ManticTitleStrategyModule, ManticUiModule } from '@mantic-ui/angular';
import { CreditsComponent } from './common/credits/credits.component';
import { HelpComponent } from './common/help/help.component';
import { FeatureComponent } from './common/help/feature/feature.component';
import { LicenseComponent } from './common/license/license.component';
import { ManticUiDocModule } from '@mantic-ui/angular-doc';
import { HeaderComponent } from './components/header/header.component';
import { ValueComponent } from './components/value/value.component';
import { InputExampleComponent } from './examples/input/input.component';
import { ButtonExampleComponent } from './examples/button/button.component';
import { DividerExampleComponent } from './examples/divider/divider.component';
import { LayoutExampleComponent } from './examples/layout/layout.component';
import { DropdownExampleComponent } from './examples/dropdown/dropdown.component';
import { TabExampleComponent } from './examples/tab/tab.component';
import { MenuExampleComponent } from './examples/menu/menu.component';
import { SegmentExampleComponent } from './examples/segment/segment.component';
import { ContainerExampleComponent } from './examples/container/container.component';
import { HeaderExampleComponent } from './examples/header/header.component';
import { SemanticMenuIframeFixed1Component } from './examples/menu/iframe/fixed1/fixed1.component';
import { SemanticIframeComponent } from './examples/iframe/iframe.component';
import { SemanticLayoutIframeComponent } from './examples/layout/iframe/layout/layout.component';
import { ModalExampleComponent } from './examples/modal/modal.component';
import { DimmerExampleComponent } from './examples/dimmer/dimmer.component';
import { CheckboxExampleComponent } from './examples/checkbox/checkbox.component';
import { ToggleExampleComponent } from './examples/toggle/toggle.component';
import { RadioExampleComponent } from './examples/radio/radio.component';
import { SliderExampleComponent } from './examples/slider/slider.component';
import { GridExampleComponent } from './examples/grid/grid.component';
import { FormExampleComponent } from './examples/form/form.component';
import { MyValidationPipe } from './examples/form/my-validation.pipe';
import { ExpanderExampleComponent } from './examples/expander/expander.component';
import { ContextMenuExampleComponent } from './examples/context-menu/context-menu.component';
import { MessageExampleComponent } from './examples/message/message.component';
import { ElementExamplesComponent } from './examples/elements/elements.component';
import { ElementListExamplesComponent } from './examples/element-list/element-list.component';
import { ComponentExamplesComponent } from './examples/components/components.component';
import { LayoutExamplesComponent } from './examples/layouts/layouts.component';
import { LayoutListExamplesComponent } from './examples/layout-list/layout-list.component';
import { SpecialExamplesComponent } from './examples/specials/specials.component';
import { SpecialListExamplesComponent } from './examples/special-list/special-list.component';
import { UtilExamplesComponent } from './examples/utils/utils.component';
import { UtilListExamplesComponent } from './examples/util-list/util-list.component';
import { NotificationExampleComponent } from './examples/notification/notification.component';
import { ChatExampleComponent } from './examples/chat/chat.component';
import { IconExampleComponent } from './examples/icon/icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from './common/common.module';
import { IntroComponent } from './common/intro/intro.component';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
    declarations: [
        AppComponent,
        CreditsComponent,
        HelpComponent,
        HeaderComponent,
        FeatureComponent,
        LicenseComponent,
        ValueComponent,
        InputExampleComponent,
        ButtonExampleComponent,
        DividerExampleComponent,
        LayoutExampleComponent,
        DropdownExampleComponent,
        TabExampleComponent,
        MenuExampleComponent,
        SegmentExampleComponent,
        ContainerExampleComponent,
        HeaderExampleComponent,
        SemanticMenuIframeFixed1Component,
        SemanticIframeComponent,
        SemanticLayoutIframeComponent,
        ModalExampleComponent,
        DimmerExampleComponent,
        CheckboxExampleComponent,
        ToggleExampleComponent,
        RadioExampleComponent,
        SliderExampleComponent,
        GridExampleComponent,
        FormExampleComponent,
        MyValidationPipe,
        ExpanderExampleComponent,
        ContextMenuExampleComponent,
        MessageExampleComponent,
        ElementExamplesComponent,
        ElementListExamplesComponent,
        ComponentExamplesComponent,
        LayoutExamplesComponent,
        LayoutListExamplesComponent,
        SpecialExamplesComponent,
        SpecialListExamplesComponent,
        UtilExamplesComponent,
        UtilListExamplesComponent,
        NotificationExampleComponent,
        ChatExampleComponent,
        IconExampleComponent,
        IntroComponent,
        NavigationComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        CommonModule,
        HttpClientModule,
        ManticUiModule,
        ManticUiDocModule,
        SemanticModule,
        FomanticModule,
        ManticTitleStrategyModule,
        FontAwesomeModule
    ],
    providers: [],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    public constructor(
        titleStrategy: ManticTitleStrategy
    ) {
        titleStrategy.postfix = ' - mantic UI';
        titleStrategy.fallback = 'mantic UI';
        titleStrategy.addCondition({ condition: '/semantic', fallback: 'Semantic UI Angular - mantic UI', postfix: ' - Semantic UI Angular - mantic UI' });
        titleStrategy.addCondition({ condition: '/fomantic', fallback: 'Fomantic UI Angular - mantic UI', postfix: ' - Fomantic UI Angular - mantic UI' });
    }
}
