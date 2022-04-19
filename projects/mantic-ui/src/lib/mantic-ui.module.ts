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
import { PositionAbsoluteDirective } from './directives/position-absolute.directive';
import { ToBodyDirective } from './directives/to-body.directive';
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
import { InputBaseComponent } from './input/input-base.component';
import { InputComponent } from './input/text/input.component';
import { NumericInputComponent } from './input/numeric/numeric-input.component';
import { DateInputComponent } from './input/date/date-input.component';
import { LabelDropdownComponent } from './label-dropdown/label-dropdown.component';
import { LabelComponent } from './label/label.component';
import { LayoutComponent } from './layout/layout.component';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuLinkComponent } from './menu-link/menu-link.component';
import { MenuComponent } from './menu/menu.component';
import { MessageComponent } from './message/message.component';
import { ModalFooterComponent } from './modal/modal-footer.component';
import { ModalHeaderComponent } from './modal/modal-header.component';
import { ModalComponent } from './modal/modal.component';
import { OrComponent } from './or/or.component';
import { DebugPipe } from './pipes/debug.pipe';
import { DebuggerPipe } from './pipes/debugger.pipe';
import { IsFilledPipe } from './pipes/is-filled.pipe';
import { IsMailPipe } from './pipes/is-mail.pipe';
import { LogPipe } from './pipes/log.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { TitlePipe } from './pipes/title.pipe';
import { RadioComponent } from './radio/radio.component';
import { RowComponent } from './row/row.component';
import { SegmentGroupComponent } from './segment-group/segment-group.component';
import { SegmentDefaultsComponent } from './segment/segment-defaults.component';
import { SegmentComponent } from './segment/segment.component';
import { SliderComponent } from './slider/slider.component';
import { SubmitComponent } from './submit/submit.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { TabComponent } from './tab/tab.component';
import { TextContainerComponent } from './text-container/text-container.component';
import { TextareaComponent } from './textarea/textarea.component';
import { ToggleButtonComponent } from './toggle-button/toggle-button.component';
import { ToggleComponent } from './toggle/toggle.component';
import { WarningComponent } from './warning/warning.component';
import { ExternalRouteComponent } from './helpers/external-route.component';
import { TableComponent } from './table/table.component';
import { NotificationComponent } from './notification/notification.component';
import { ButtonBaseComponent } from './base/button-base.component';
import { DimmableComponent } from './base/dimmable.component';
import { LabeledBaseComponent } from './base/labeled-base.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoaderComponent } from './loader/loader.component';
import { ChatComponent } from './chat/chat.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { PadStartPipe } from './pipes/pad-start.pipe';
import { PadEndPipe } from './pipes/pad-end.pipe';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { AsInputPipe } from './form-element-renderer/pipes/as-input.pipe';
import { AsCheckboxPipe } from './form-element-renderer/pipes/as-checkbox.pipe';
import { AsFieldsPipe } from './form-element-renderer/pipes/as-fields.pipe';
import { FormElementRendererComponent } from './form-element-renderer/form-element-renderer.component';
import { FlagComponent } from './flag/flag.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { AsAreaPipe } from './form-element-renderer/pipes/as-area.pipe';
import { AsDropDownPipe } from './form-element-renderer/pipes/as-drop-down.pipe';
import { DataSourceComponent } from './data-source/data-source.component';
import { AsButtonPipe } from './form-element-renderer/pipes/as-button.pipe';
import { FormElementRenderer2Component } from './form-element-renderer/form-element-renderer2.component';
import { AsGridPipe } from './form-element-renderer/pipes/as-grid.pipe';
import { AsLabelPipe } from './form-element-renderer/pipes/as-label.pipe';
import { DestroyableComponent } from './base/destroyable.component';
import { BaseComponent } from './base/base.component';
import { RouterModule } from '@angular/router';
import { FlexComponent } from './flex/flex.component';
import { FillComponent } from './flex/fill/fill.component';
import { AutoComponent } from './flex/auto/auto.component';
import { FillDirective } from './flex/fill/fill.directive';
import { AutoDirective } from './flex/auto/auto.directive';
import { FlexDirective } from './flex/flex.directive';
import { ArrayPipe } from './pipes/array.pipe';
import { RoundPipe } from './pipes/round.pipe';
import { CeilPipe } from './pipes/ceil.pipe';
import { FloorPipe } from './pipes/floor.pipe';
import { AllowedCharsPipe } from './pipes/allowed-chars.pipe';
import { DocumentTitleComponent } from './document-title/document-title.component';
import { DestroyableDirective } from './base/destroyable.directive';
import { BaseDirective } from './base/base.directive';
import { ExpanderComponent } from './expander/expander.component';
import { ExpanderHeaderComponent } from './expander/expander-header.component';
import { GrowComponent } from './flex/grow/grow.component';
import { GrowDirective } from './flex/grow/grow.directive';
import { ShrinkComponent } from './flex/shrink/shrink.component';
import { ShrinkDirective } from './flex/shrink/shrink.directive';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ContextMenuItemComponent } from './context-menu/item/context-menu-item.component';

@NgModule({
  declarations: [
    BaseComponent,
    BaseDirective,
    DestroyableComponent,
    DestroyableDirective,
    ButtonBaseComponent,
    DimmableComponent,
    LabeledBaseComponent,
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
    InputBaseComponent,
    InputComponent,
    NumericInputComponent,
    DateInputComponent,
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
    ToBodyDirective,
    PositionAbsoluteDirective,
    MenuLinkTemplateDirective,
    FooterLinkTemplateDirective,
    FormComponent,
    FieldComponent,
    FieldGroupComponent,
    MessageComponent,
    RowComponent,
    TextareaComponent,
    IsFilledPipe,
    IsMailPipe,
    LogPipe,
    DebuggerPipe,
    DebugPipe,
    TitlePipe,
    SubmitComponent,
    ExternalRouteComponent,
    TableComponent,
    NotificationComponent,
    SidebarComponent,
    LoaderComponent,
    ChatComponent,
    ChatMessageComponent,
    PadStartPipe,
    PadEndPipe,
    FormRendererComponent,
    AsInputPipe,
    AsCheckboxPipe,
    AsFieldsPipe,
    FormElementRendererComponent,
    FlagComponent,
    ImageUploadComponent,
    AsAreaPipe,
    AsDropDownPipe,
    DataSourceComponent,
    AsButtonPipe,
    FormElementRenderer2Component,
    AsGridPipe,
    AsLabelPipe,
    FlexComponent,
    FlexDirective,
    FillComponent,
    FillDirective,
    AutoComponent,
    AutoDirective,
    GrowComponent,
    GrowDirective,
    ShrinkComponent,
    ShrinkDirective,
    ArrayPipe,
    RoundPipe,
    CeilPipe,
    FloorPipe,
    AllowedCharsPipe,
    DocumentTitleComponent,
    ExpanderComponent,
    ExpanderHeaderComponent,
    ContextMenuComponent,
    ContextMenuItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    DestroyableComponent,
    DestroyableDirective,
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
    NumericInputComponent,
    DateInputComponent,
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
    ToBodyDirective,
    PositionAbsoluteDirective,
    FormComponent,
    FieldComponent,
    FieldGroupComponent,
    MessageComponent,
    RowComponent,
    TextareaComponent,
    IsFilledPipe,
    IsMailPipe,
    LogPipe,
    DebuggerPipe,
    DebugPipe,
    TitlePipe,
    SubmitComponent,
    ExternalRouteComponent,
    TableComponent,
    NotificationComponent,
    SidebarComponent,
    LoaderComponent,
    ChatComponent,
    ChatMessageComponent,
    PadStartPipe,
    FormRendererComponent,
    FlagComponent,
    ImageUploadComponent,
    DataSourceComponent,
    FormElementRenderer2Component,
    FlexComponent,
    FlexDirective,
    FillComponent,
    FillDirective,
    AutoComponent,
    AutoDirective,
    GrowComponent,
    GrowDirective,
    ShrinkComponent,
    ShrinkDirective,
    ArrayPipe,
    CeilPipe,
    AllowedCharsPipe,
    DocumentTitleComponent,
    ExpanderComponent,
    ExpanderHeaderComponent,
    ContextMenuComponent,
    ContextMenuItemComponent
  ]
})
export class ManticUiModule {
}
