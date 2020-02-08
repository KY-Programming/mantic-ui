import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ButtonGroupComponent } from './button-group/button-group.component';
import { ButtonComponent } from './button/button.component';
import { DividerComponent } from './divider/divider.component';
import { DropdownItemComponent } from './dropdown-item/dropdown-item.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ExampleComponent } from './example/example.component';
import { FooterComponent } from './footer/footer.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { IconComponent } from './icon/icon.component';
import { InputComponent } from './input/input.component';
import { LabelDropdownComponent } from './label-dropdown/label-dropdown.component';
import { LabelComponent } from './label/label.component';
import { LayoutComponent } from './layout/layout.component';
import { LogoComponent } from './logo/logo.component';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuLinkComponent } from './menu-link/menu-link.component';
import { MenuComponent } from './menu/menu.component';
import { OrComponent } from './or/or.component';
import { SegmentDefaultsComponent } from './segment/segment-defaults.component';
import { SegmentComponent } from './segment/segment.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { TabComponent } from './tab/tab.component';
import { TextContainerComponent } from './text-container/text-container.component';
import { ToggleButtonComponent } from './toggle-button/toggle-button.component';
import { WarningComponent } from './warning/warning.component';

@NgModule({
  declarations: [
    ButtonComponent,
    ToggleButtonComponent,
    ButtonGroupComponent,
    IconButtonComponent,
    IconComponent,
    SegmentComponent,
    SegmentDefaultsComponent,
    DividerComponent,
    OrComponent,
    InputComponent,
    LabelComponent,
    LabelDropdownComponent,
    ExampleComponent,
    MenuComponent,
    LayoutComponent,
    LogoComponent,
    BreadcrumbComponent,
    MenuItemComponent,
    TextContainerComponent,
    FooterComponent,
    TabGroupComponent,
    TabComponent,
    WarningComponent,
    DropdownComponent,
    DropdownItemComponent,
    MenuLinkComponent,
    MenuHeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ButtonComponent,
    ToggleButtonComponent,
    ButtonGroupComponent,
    IconButtonComponent,
    IconComponent,
    SegmentComponent,
    SegmentDefaultsComponent,
    DividerComponent,
    OrComponent,
    InputComponent,
    LabelComponent,
    LabelDropdownComponent,
    ExampleComponent,
    MenuComponent,
    LayoutComponent,
    LogoComponent,
    BreadcrumbComponent,
    MenuItemComponent,
    TextContainerComponent,
    FooterComponent,
    TabGroupComponent,
    TabComponent,
    WarningComponent,
    DropdownComponent,
    DropdownItemComponent,
    MenuLinkComponent,
    MenuHeaderComponent
  ]
})
export class ManticUiModule { }
