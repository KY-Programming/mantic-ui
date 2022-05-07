import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FomanticButtonComponent } from './fomantic/button/button.component';
import { FomanticDividerComponent } from './fomantic/divider/divider.component';
import { FomanticInputComponent } from './fomantic/input/input.component';
import { FomanticLayoutComponent } from './fomantic/layout/layout.component';
import { FomanticStartComponent } from './fomantic/start/start.component';
import { IntroComponent } from './intro/intro.component';
import { SemanticButtonComponent } from './semantic/button/button.component';
import { SemanticCheckboxComponent } from './semantic/checkbox/checkbox.component';
import { SemanticContainerComponent } from './semantic/container/container.component';
import { SemanticDimmerComponent } from './semantic/dimmer/dimmer.component';
import { SemanticDividerComponent } from './semantic/divider/divider.component';
import { SemanticDropdownComponent } from './semantic/dropdown/dropdown.component';
import { SemanticFormComponent } from './semantic/form/form.component';
import { SemanticGridComponent } from './semantic/grid/grid.component';
import { SemanticHeaderComponent } from './semantic/header/header.component';
import { SemanticIframeComponent } from './semantic/iframe/iframe.component';
import { SemanticInputComponent } from './semantic/input/input.component';
import { SemanticLayoutIframeComponent } from './semantic/layout/iframe/layout/layout.component';
import { SemanticLayoutComponent } from './semantic/layout/layout.component';
import { SemanticMenuIframeFixed1Component } from './semantic/menu/iframe/fixed1/fixed1.component';
import { SemanticMenuComponent } from './semantic/menu/menu.component';
import { SemanticModalComponent } from './semantic/modal/modal.component';
import { SemanticOuterComponent } from './semantic/outer/outer.component';
import { SemanticRadioComponent } from './semantic/radio/radio.component';
import { SemanticSegmentComponent } from './semantic/segment/segment.component';
import { SemanticSliderComponent } from './semantic/slider/slider.component';
import { SemanticStartComponent } from './semantic/start/start.component';
import { SemanticTabComponent } from './semantic/tab/tab.component';
import { SemanticToggleComponent } from './semantic/toggle/toggle.component';
import { SemanticLicenseComponent } from './semantic/license/license.component';
import { SemanticCreditsComponent } from './semantic/credits/credits.component';
import { SemanticExpanderComponent } from './semantic/expander/expander.component';
import { SemanticContextMenuComponent } from './semantic/context-menu/context-menu.component';
import { SemanticMessageComponent } from './semantic/message/message.component';
import { SemanticElementsComponent } from './semantic/elements/elements.component';
import { SemanticComponentsComponent } from './semantic/components/components.component';
import { SemanticLayoutsComponent } from './semantic/layouts/layouts.component';
import { SemanticSpecialsComponent } from './semantic/specials/specials.component';
import { SemanticUtilsComponent } from './semantic/utils/utils.component';
import { SemanticNotificationComponent } from './semantic/notification/notification.component';
import { SemanticChatComponent } from './semantic/chat/chat.component';

const routes: Routes = [
  { path: '', component: IntroComponent },
  {
    path: 'semantic', component: SemanticOuterComponent, children: [
      { path: 'start', component: SemanticStartComponent },
      { path: 'components', component: SemanticComponentsComponent },
      { path: 'elements', component: SemanticElementsComponent },
      { path: 'layouts', component: SemanticLayoutsComponent },
      { path: 'specials', component: SemanticSpecialsComponent },
      { path: 'utils', component: SemanticUtilsComponent },
      { path: 'button', redirectTo: 'button/', pathMatch: 'full' },
      { path: 'button/:tab', component: SemanticButtonComponent },
      { path: 'divider', redirectTo: 'divider/', pathMatch: 'full' },
      { path: 'divider/:tab', component: SemanticDividerComponent },
      { path: 'input', redirectTo: 'input/', pathMatch: 'full' },
      { path: 'input/:tab', component: SemanticInputComponent },
      { path: 'dropdown', redirectTo: 'dropdown/', pathMatch: 'full' },
      { path: 'dropdown/:tab', component: SemanticDropdownComponent },
      { path: 'tab', redirectTo: 'tab/', pathMatch: 'full' },
      { path: 'tab/:tab', component: SemanticTabComponent },
      { path: 'menu', redirectTo: 'menu/', pathMatch: 'full' },
      { path: 'menu/:tab', component: SemanticMenuComponent },
      { path: 'segment', redirectTo: 'segment/', pathMatch: 'full' },
      { path: 'segment/:tab', component: SemanticSegmentComponent },
      { path: 'container', redirectTo: 'container/', pathMatch: 'full' },
      { path: 'container/:tab', component: SemanticContainerComponent },
      { path: 'header', redirectTo: 'header/', pathMatch: 'full' },
      { path: 'header/:tab', component: SemanticHeaderComponent },
      { path: 'layout', redirectTo: 'layout/', pathMatch: 'full' },
      { path: 'layout/:tab', component: SemanticLayoutComponent },
      { path: 'modal', redirectTo: 'modal/', pathMatch: 'full' },
      { path: 'modal/:tab', component: SemanticModalComponent },
      { path: 'dimmer', redirectTo: 'dimmer/', pathMatch: 'full' },
      { path: 'dimmer/:tab', component: SemanticDimmerComponent },
      { path: 'checkbox', redirectTo: 'checkbox/', pathMatch: 'full' },
      { path: 'checkbox/:tab', component: SemanticCheckboxComponent },
      { path: 'toggle', redirectTo: 'toggle/', pathMatch: 'full' },
      { path: 'toggle/:tab', component: SemanticToggleComponent },
      { path: 'radio', redirectTo: 'radio/', pathMatch: 'full' },
      { path: 'radio/:tab', component: SemanticRadioComponent },
      { path: 'message', redirectTo: 'message/', pathMatch: 'full' },
      { path: 'message/:tab', component: SemanticMessageComponent },
      { path: 'slider', redirectTo: 'slider/', pathMatch: 'full' },
      { path: 'slider/:tab', component: SemanticSliderComponent },
      { path: 'grid', redirectTo: 'grid/', pathMatch: 'full' },
      { path: 'grid/:tab', component: SemanticGridComponent },
      { path: 'form', redirectTo: 'form/', pathMatch: 'full' },
      { path: 'form/:tab', component: SemanticFormComponent },
      { path: 'license', redirectTo: 'license/', pathMatch: 'full' },
      { path: 'license/:tab', component: SemanticLicenseComponent },
      { path: 'credits', redirectTo: 'credits/', pathMatch: 'full' },
      { path: 'credits/:tab', component: SemanticCreditsComponent },
      { path: 'expander', redirectTo: 'expander/', pathMatch: 'full' },
      { path: 'expander/:tab', component: SemanticExpanderComponent },
      { path: 'context-menu', redirectTo: 'context-menu/', pathMatch: 'full' },
      { path: 'context-menu/:tab', component: SemanticContextMenuComponent },
      { path: 'notification', redirectTo: 'notification/', pathMatch: 'full' },
      { path: 'notification/:tab', component: SemanticNotificationComponent },
      { path: 'chat', redirectTo: 'chat/', pathMatch: 'full' },
      { path: 'chat/:tab', component: SemanticChatComponent },
      { path: '**', redirectTo: 'components' }
    ]
  },
  {
    path: 'fomantic', component: FomanticLayoutComponent, children: [
      { path: 'start', component: FomanticStartComponent },
      { path: 'button', component: FomanticButtonComponent },
      { path: 'divider', component: FomanticDividerComponent },
      { path: 'input', component: FomanticInputComponent },
      { path: '**', redirectTo: 'start' }
    ]
  },
  {
    path: 'iframe', children: [
      {
        path: 'semantic', component: SemanticIframeComponent, children: [
          { path: 'menu-fixed-1', component: SemanticMenuIframeFixed1Component },
          { path: 'layout', component: SemanticLayoutIframeComponent }
        ]
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
