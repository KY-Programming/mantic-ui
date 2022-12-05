import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { FomanticStartComponent } from './fomantic/start/start.component';
import { IntroComponent } from './common/intro/intro.component';
import { ButtonExampleComponent } from './examples/button/button.component';
import { CheckboxExampleComponent } from './examples/checkbox/checkbox.component';
import { ContainerExampleComponent } from './examples/container/container.component';
import { DimmerExampleComponent } from './examples/dimmer/dimmer.component';
import { DividerExampleComponent } from './examples/divider/divider.component';
import { DropdownExampleComponent } from './examples/dropdown/dropdown.component';
import { FormExampleComponent } from './examples/form/form.component';
import { GridExampleComponent } from './examples/grid/grid.component';
import { HeaderExampleComponent } from './examples/header/header.component';
import { InputExampleComponent } from './examples/input/input.component';
import { MenuExampleComponent } from './examples/menu/menu.component';
import { ModalExampleComponent } from './examples/modal/modal.component';
import { RadioExampleComponent } from './examples/radio/radio.component';
import { SegmentExampleComponent } from './examples/segment/segment.component';
import { SliderExampleComponent } from './examples/slider/slider.component';
import { TabExampleComponent } from './examples/tab/tab.component';
import { ToggleExampleComponent } from './examples/toggle/toggle.component';
import { ExpanderExampleComponent } from './examples/expander/expander.component';
import { ContextMenuExampleComponent } from './examples/context-menu/context-menu.component';
import { MessageExampleComponent } from './examples/message/message.component';
import { NotificationExampleComponent } from './examples/notification/notification.component';
import { ChatExampleComponent } from './examples/chat/chat.component';
import { HelpComponent } from './common/help/help.component';
import { FeatureComponent } from './common/help/feature/feature.component';
import { IconExampleComponent } from './examples/icon/icon.component';
import { FomanticLayoutComponent } from './fomantic/layout.component';
import { ComponentExamplesComponent } from './examples/components/components.component';
import { ElementExamplesComponent } from './examples/elements/elements.component';
import { LayoutExamplesComponent } from './examples/layouts/layouts.component';
import { SpecialExamplesComponent } from './examples/specials/specials.component';
import { UtilExamplesComponent } from './examples/utils/utils.component';
import { LayoutExampleComponent } from './examples/layout/layout.component';
import { LicenseComponent } from './common/license/license.component';
import { CreditsComponent } from './common/credits/credits.component';
import { SemanticLayoutComponent } from './semantic/layout.component';
import { SemanticStartComponent } from './semantic/start/start.component';
import { SemanticIframeComponent } from './examples/iframe/iframe.component';
import { SemanticMenuIframeFixed1Component } from './examples/menu/iframe/fixed1/fixed1.component';
import { SemanticLayoutIframeComponent } from './examples/layout/iframe/layout/layout.component';
import { CommonLayoutComponent } from './common/layout.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TextareaExampleComponent } from './examples/textarea/textarea.component';
import { TableExampleComponent } from './examples/table/table.component';
import { TestExampleComponent } from './examples/test/test.component';

const sharedRoutes: Route[] = [
    { path: 'help', redirectTo: 'help/', pathMatch: 'full' },
    { path: 'help/feature', title: 'Missing a Feature?', component: FeatureComponent },
    { path: 'help/:tab', title: 'How to get help?', component: HelpComponent },
    { path: 'license', redirectTo: 'license/', pathMatch: 'full' },
    { path: 'license/:tab', title: 'License', component: LicenseComponent },
    { path: 'credits', redirectTo: 'credits/', pathMatch: 'full' },
    { path: 'credits/:tab', title: 'Credits', component: CreditsComponent },

    { path: 'components', redirectTo: 'components/', pathMatch: 'full' },
    { path: 'components/:tab', title: 'Components', component: ComponentExamplesComponent },
    { path: 'elements', redirectTo: 'elements/', pathMatch: 'full' },
    { path: 'elements/:tab', title: 'Elements', component: ElementExamplesComponent },
    { path: 'layouts', redirectTo: 'layouts/', pathMatch: 'full' },
    { path: 'layouts/:tab', title: 'Layout', component: LayoutExamplesComponent },
    { path: 'specials', redirectTo: 'specials/', pathMatch: 'full' },
    { path: 'specials/:tab', title: 'Special', component: SpecialExamplesComponent },
    { path: 'utils', redirectTo: 'utils/', pathMatch: 'full' },
    { path: 'utils/:tab', title: 'Utils', component: UtilExamplesComponent },
    { path: 'button', redirectTo: 'button/', pathMatch: 'full' },
    { path: 'button/:tab', title: 'Button', component: ButtonExampleComponent },
    { path: 'divider', redirectTo: 'divider/', pathMatch: 'full' },
    { path: 'divider/:tab', title: 'Divider', component: DividerExampleComponent },
    { path: 'input', redirectTo: 'input/', pathMatch: 'full' },
    { path: 'input/:tab', title: 'Input', component: InputExampleComponent },
    { path: 'dropdown', redirectTo: 'dropdown/', pathMatch: 'full' },
    { path: 'dropdown/:tab', title: 'Dropdown', component: DropdownExampleComponent },
    { path: 'tab', redirectTo: 'tab/', pathMatch: 'full' },
    { path: 'tab/:tab', title: 'Tab', component: TabExampleComponent },
    { path: 'menu', redirectTo: 'menu/', pathMatch: 'full' },
    { path: 'menu/:tab', title: 'Menu', component: MenuExampleComponent },
    { path: 'segment', redirectTo: 'segment/', pathMatch: 'full' },
    { path: 'segment/:tab', title: 'Segment', component: SegmentExampleComponent },
    { path: 'container', redirectTo: 'container/', pathMatch: 'full' },
    { path: 'container/:tab', title: 'Container', component: ContainerExampleComponent },
    { path: 'header', redirectTo: 'header/', pathMatch: 'full' },
    { path: 'header/:tab', title: 'Header', component: HeaderExampleComponent },
    { path: 'layout', redirectTo: 'layout/', pathMatch: 'full' },
    { path: 'layout/:tab', title: 'Layout', component: LayoutExampleComponent },
    { path: 'modal', redirectTo: 'modal/', pathMatch: 'full' },
    { path: 'modal/:tab', title: 'Modal', component: ModalExampleComponent },
    { path: 'dimmer', redirectTo: 'dimmer/', pathMatch: 'full' },
    { path: 'dimmer/:tab', title: 'Dimmer', component: DimmerExampleComponent },
    { path: 'checkbox', redirectTo: 'checkbox/', pathMatch: 'full' },
    { path: 'checkbox/:tab', title: 'Checkbox', component: CheckboxExampleComponent },
    { path: 'toggle', redirectTo: 'toggle/', pathMatch: 'full' },
    { path: 'toggle/:tab', title: 'Toggle', component: ToggleExampleComponent },
    { path: 'radio', redirectTo: 'radio/', pathMatch: 'full' },
    { path: 'radio/:tab', title: 'Radio', component: RadioExampleComponent },
    { path: 'message', redirectTo: 'message/', pathMatch: 'full' },
    { path: 'message/:tab', title: 'Message', component: MessageExampleComponent },
    { path: 'slider', redirectTo: 'slider/', pathMatch: 'full' },
    { path: 'slider/:tab', title: 'Slider', component: SliderExampleComponent },
    { path: 'grid', redirectTo: 'grid/', pathMatch: 'full' },
    { path: 'grid/:tab', title: 'Grid', component: GridExampleComponent },
    { path: 'form', redirectTo: 'form/', pathMatch: 'full' },
    { path: 'form/:tab', title: 'Form', component: FormExampleComponent },
    { path: 'expander', redirectTo: 'expander/', pathMatch: 'full' },
    { path: 'expander/:tab', title: 'Expander', component: ExpanderExampleComponent },
    { path: 'context-menu', redirectTo: 'context-menu/', pathMatch: 'full' },
    { path: 'context-menu/:tab', title: 'Context Menu', component: ContextMenuExampleComponent },
    { path: 'notification', redirectTo: 'notification/', pathMatch: 'full' },
    { path: 'notification/:tab', title: 'Notification', component: NotificationExampleComponent },
    { path: 'chat', redirectTo: 'chat/', pathMatch: 'full' },
    { path: 'chat/:tab', title: 'Chat', component: ChatExampleComponent },
    { path: 'icon', redirectTo: 'icon/', pathMatch: 'full' },
    { path: 'icon/:tab', title: 'Icon', component: IconExampleComponent },
    { path: 'textarea', redirectTo: 'textarea/', pathMatch: 'full' },
    { path: 'textarea/:tab', title: 'Icon', component: TextareaExampleComponent },
    { path: 'table', redirectTo: 'table/', pathMatch: 'full' },
    { path: 'table/:tab', title: 'Icon', component: TableExampleComponent },
    { path: '**', redirectTo: 'components/' }
];

const routes: Routes = [
    {
        path: '', component: CommonLayoutComponent, children: [
            { path: '', component: IntroComponent }
        ]
    },
    {
        path: '', component: NavigationComponent, children: [
            {
                path: 'semantic', component: SemanticLayoutComponent, children: [
                    { path: 'start', title: 'Getting Started', component: SemanticStartComponent },
                    ...sharedRoutes
                ]
            },
            {
                path: 'fomantic', component: FomanticLayoutComponent, children: [
                    { path: 'start', title: 'Getting Started', component: FomanticStartComponent },
                    ...sharedRoutes
                ]
            },
            {
                path: 'iframe', children: [
                    {
                        path: '', component: SemanticIframeComponent, children: [
                            { path: 'menu-fixed-1', component: SemanticMenuIframeFixed1Component },
                            { path: 'layout', component: SemanticLayoutIframeComponent }
                        ]
                    }
                ]
            }
        ]
    },
    { path: 'test', title: 'Test', component: TestExampleComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
