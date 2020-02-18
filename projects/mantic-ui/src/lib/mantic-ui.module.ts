import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ButtonGroupComponent } from './button-group/button-group.component';
import { ButtonComponent } from './button/button.component';
import { DimmerComponent } from './dimmer/dimmer.component';
import { ButtonDirective } from './directives/button.directive';
import { FallbackForDirective } from './directives/fallback-for.directive';
import { HeaderDirective } from './directives/header.directive';
import { MenuItemDirective } from './directives/menu-item.directive';
import { DividerComponent } from './divider/divider.component';
import { DropdownItemComponent } from './dropdown-item/dropdown-item.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ErrorComponent } from './error/error.component';
import { ExampleCodeComponent } from './example-code/example-code.component';
import { ExampleFrameComponent } from './example-frame/example-frame.component';
import { ExampleComponent } from './example/example.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { IconComponent } from './icon/icon.component';
import { InfoComponent } from './info/info.component';
import { InputComponent } from './input/input.component';
import { LabelDropdownComponent } from './label-dropdown/label-dropdown.component';
import { LabelComponent } from './label/label.component';
import { LayoutComponent } from './layout/layout.component';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuLinkComponent } from './menu-link/menu-link.component';
import { MenuComponent } from './menu/menu.component';
import { ModalFooterComponent } from './modal/modal-footer.component';
import { ModalHeaderComponent } from './modal/modal-header.component';
import { ModalComponent } from './modal/modal.component';
import { OrComponent } from './or/or.component';
import { SafePipe } from './pipes/safe.pipe';
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
    BreadcrumbComponent,
    MenuItemComponent,
    TextContainerComponent,
    FooterComponent,
    TabGroupComponent,
    TabComponent,
    InfoComponent,
    WarningComponent,
    ErrorComponent,
    DropdownComponent,
    DropdownItemComponent,
    MenuLinkComponent,
    MenuHeaderComponent,
    ButtonDirective,
    HeaderDirective,
    HeaderComponent,
    MenuItemDirective,
    ExampleFrameComponent,
    SafePipe,
    ModalComponent,
    ModalFooterComponent,
    FallbackForDirective,
    ModalHeaderComponent,
    DimmerComponent,
    ExampleCodeComponent
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
    BreadcrumbComponent,
    MenuItemComponent,
    TextContainerComponent,
    FooterComponent,
    TabGroupComponent,
    TabComponent,
    InfoComponent,
    WarningComponent,
    ErrorComponent,
    DropdownComponent,
    DropdownItemComponent,
    MenuLinkComponent,
    MenuHeaderComponent,
    ButtonDirective,
    HeaderDirective,
    HeaderComponent,
    MenuItemDirective,
    ExampleFrameComponent,
    SafePipe,
    ModalComponent,
    ModalFooterComponent,
    FallbackForDirective,
    ModalHeaderComponent,
    DimmerComponent,
    ExampleCodeComponent
  ]
})
export class ManticUiModule { }
