import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnimationComponent } from './animation/animation.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ButtonGroupComponent } from './button-group/button-group.component';
import { ButtonComponent } from './button/button.component';
import { CellComponent } from './cell/cell.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DimmerComponent } from './dimmer/dimmer.component';
import { ButtonDirective } from './directives/button.directive';
import { FallbackForDirective } from './directives/fallback-for.directive';
import { FooterLinkTemplateDirective } from './directives/footer-link-template.directive';
import { HeaderDirective } from './directives/header.directive';
import { MenuItemDirective } from './directives/menu-item.directive';
import { MenuLinkTemplateDirective } from './directives/menu-link-template.directive';
import { ToTemplateDirective } from './directives/to-template.directive';
import { DividerComponent } from './divider/divider.component';
import { DropdownItemComponent } from './dropdown-item/dropdown-item.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ErrorComponent } from './error/error.component';
import { FieldGroupComponent } from './field-group/field-group.component';
import { FieldComponent } from './field/field.component';
import { FooterLinkComponent } from './footer-link/footer-link.component';
import { FooterComponent } from './footer/footer.component';
import { FormComponent } from './form/form.component';
import { GridComponent } from './grid/grid.component';
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
import { RadioComponent } from './radio/radio.component';
import { SegmentGroupComponent } from './segment-group/segment-group.component';
import { SegmentDefaultsComponent } from './segment/segment-defaults.component';
import { SegmentComponent } from './segment/segment.component';
import { SliderComponent } from './slider/slider.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { TabComponent } from './tab/tab.component';
import { TextContainerComponent } from './text-container/text-container.component';
import { ToggleButtonComponent } from './toggle-button/toggle-button.component';
import { ToggleComponent } from './toggle/toggle.component';
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
    SegmentGroupComponent,
    DividerComponent,
    OrComponent,
    InputComponent,
    LabelComponent,
    LabelDropdownComponent,
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
    FooterLinkComponent,
    MenuHeaderComponent,
    ButtonDirective,
    HeaderDirective,
    HeaderComponent,
    MenuItemDirective,
    SafePipe,
    ModalComponent,
    ModalFooterComponent,
    FallbackForDirective,
    ModalHeaderComponent,
    DimmerComponent,
    CheckboxComponent,
    ToggleComponent,
    RadioComponent,
    SliderComponent,
    AnimationComponent,
    GridComponent,
    CellComponent,
    ToTemplateDirective,
    MenuLinkTemplateDirective,
    FooterLinkTemplateDirective,
    FormComponent,
    FieldComponent,
    FieldGroupComponent
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
    SegmentGroupComponent,
    DividerComponent,
    OrComponent,
    InputComponent,
    LabelComponent,
    LabelDropdownComponent,
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
    FooterLinkComponent,
    MenuHeaderComponent,
    ButtonDirective,
    HeaderDirective,
    HeaderComponent,
    MenuItemDirective,
    SafePipe,
    ModalComponent,
    ModalFooterComponent,
    FallbackForDirective,
    ModalHeaderComponent,
    DimmerComponent,
    CheckboxComponent,
    ToggleComponent,
    RadioComponent,
    SliderComponent,
    AnimationComponent,
    GridComponent,
    CellComponent,
    ToTemplateDirective,
    FormComponent,
    FieldComponent,
    FieldGroupComponent
  ]
})
export class ManticUiModule { }
