import { NgModule } from '@angular/core';
import { AnimationComponent } from './components/animation/animation.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ButtonGroupComponent } from './components/button-group/button-group.component';
import { ButtonComponent } from './components/button/button.component';
import { CellComponent } from './components/cell/cell.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DimmerComponent } from './components/dimmer/dimmer.component';
import { ButtonDirective } from './directives/button.directive';
import { FallbackForDirective } from './directives/fallback-for.directive';
import { FooterLinkTemplateDirective } from './directives/footer-link-template.directive';
import { HeaderDirective } from './directives/header.directive';
import { MenuItemDirective } from './directives/menu-item.directive';
import { MenuLinkTemplateDirective } from './directives/menu-link-template.directive';
import { PositionAbsoluteDirective } from './directives/position-absolute.directive';
import { ToBodyDirective } from './directives/to-body.directive';
import { ToTemplateDirective } from './directives/to-template.directive';
import { DividerComponent } from './components/divider/divider.component';
import { DropdownItemComponent } from './components/dropdown-item/dropdown-item.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ErrorComponent } from './components/error/error.component';
import { FieldGroupComponent } from './components/field-group/field-group.component';
import { FieldComponent } from './components/field/field.component';
import { FooterLinkComponent } from './components/footer-link/footer-link.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormComponent } from './components/form/form.component';
import { GridComponent } from './components/grid/grid.component';
import { HeaderComponent } from './components/header/header.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { IconComponent } from './components/icon/icon.component';
import { InfoComponent } from './components/info/info.component';
import { InputComponent } from './components/input/text/input.component';
import { NumericInputComponent } from './components/input/numeric/numeric-input.component';
import { DateInputComponent } from './components/input/date/date-input.component';
import { LabelDropdownComponent } from './components/label-dropdown/label-dropdown.component';
import { LabelComponent } from './components/label/label.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MenuHeaderComponent } from './components/menu-header/menu-header.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { MenuLinkComponent } from './components/menu-link/menu-link.component';
import { MenuComponent } from './components/menu/menu.component';
import { MessageComponent } from './components/message/message.component';
import { ModalFooterComponent } from './components/modal/modal-footer.component';
import { ModalHeaderComponent } from './components/modal/modal-header.component';
import { ModalComponent } from './components/modal/modal.component';
import { OrComponent } from './components/or/or.component';
import { DebugPipe } from './pipes/debug.pipe';
import { DebuggerPipe } from './pipes/debugger.pipe';
import { IsFilledPipe } from './pipes/is-filled.pipe';
import { IsMailPipe } from './pipes/is-mail.pipe';
import { LogPipe } from './pipes/log.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { TitlePipe } from './pipes/title.pipe';
import { RadioComponent } from './components/radio/radio.component';
import { RowComponent } from './components/row/row.component';
import { SegmentGroupComponent } from './components/segment-group/segment-group.component';
import { SegmentDefaultsComponent } from './components/segment/segment-defaults.component';
import { SegmentComponent } from './components/segment/segment.component';
import { SliderComponent } from './components/slider/slider.component';
import { SubmitComponent } from './components/submit/submit.component';
import { TabGroupComponent } from './components/tab-group/tab-group.component';
import { TabComponent } from './components/tab/tab.component';
import { TextContainerComponent } from './components/text-container/text-container.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { WarningComponent } from './components/warning/warning.component';
import { TableComponent } from './components/table/table.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { PadStartPipe } from './pipes/pad-start.pipe';
import { PadEndPipe } from './pipes/pad-end.pipe';
import { FormRendererComponent } from './components/form-renderer/form-renderer.component';
import { FormElementRendererComponent } from './components/form-element-renderer/form-element-renderer.component';
import { FlagComponent } from './components/flag/flag.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { DataSourceComponent } from './components/data-source/data-source.component';
import { FormElementRenderer2Component } from './components/form-element-renderer/form-element-renderer2.component';
import { FlexComponent } from './components/flex/flex.component';
import { FillComponent } from './components/flex/fill/fill.component';
import { AutoComponent } from './components/flex/auto/auto.component';
import { FillDirective } from './components/flex/fill/fill.directive';
import { AutoDirective } from './components/flex/auto/auto.directive';
import { FlexDirective } from './components/flex/flex.directive';
import { ArrayPipe } from './pipes/array.pipe';
import { RoundPipe } from './pipes/round.pipe';
import { CeilPipe } from './pipes/ceil.pipe';
import { FloorPipe } from './pipes/floor.pipe';
import { AllowedCharsPipe } from './pipes/allowed-chars.pipe';
import { DocumentTitleComponent } from './components/document-title/document-title.component';
import { ExpanderComponent } from './components/expander/expander.component';
import { ExpanderHeaderComponent } from './components/expander/expander-header.component';
import { GrowComponent } from './components/flex/grow/grow.component';
import { GrowDirective } from './components/flex/grow/grow.directive';
import { ShrinkComponent } from './components/flex/shrink/shrink.component';
import { ShrinkDirective } from './components/flex/shrink/shrink.directive';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { ContextMenuItemComponent } from './components/context-menu/item/context-menu-item.component';
import { FileInputComponent } from './components/input/file/file-input.component';
import { DocumentNoIndexComponent } from './components/document-no-index/document-no-index.component';
import { ModalDefaultsComponent } from './components/modal/modal-defaults.component';
import { ChatDefaultsComponent } from './components/chat/chat-defaults.component';
import { ExpanderDefaultsComponent } from './components/expander/expander-defaults.component';
import { LabelDropdownDefaultsComponent } from './components/label-dropdown/label-dropdown-defaults.component';
import { LayoutDefaultsComponent } from './components/layout/layout-defaults.component';
import { DropdownDefaultsComponent } from './components/dropdown/dropdown-defaults.component';
import { MessageDefaultsComponent } from './components/message/message-defaults.component';
import { CheckboxDefaultsComponent } from './components/checkbox/checkbox-defaults.component';
import { TableDefaultsComponent } from './components/table/table-defaults.component';
import { FormDefaultsComponent } from './components/form/form-defaults.component';
import { DropdownGroupComponent } from './components/dropdown-group/dropdown-group.component';
import { ExpanderIconComponent } from './components/expander-icon/expander-icon.component';
import { ExpanderPartComponent } from './components/expander-part/expander-part.component';
import { InputDefaultsComponent } from './components/input/input-defaults.component';
import { TextareaDefaultsComponent } from './components/textarea/textarea-defaults.component';
import { TabGroupDefaultsComponent } from './components/tab-group/tab-group-defaults.component';
import { DimmerDefaultsComponent } from './components/dimmer/dimmer-defaults.component';
import { TimeInputComponent } from './components/input/time/time-input.component';
import { ColorDirective } from './directives/color.directive';
import { BasicDirective } from './directives/basic.directive';
import { InvertedDirective } from './directives/inverted.directive';
import { LoadingDirective } from './directives/loading.directive';
import { DisabledDirective } from './directives/disabled.directive';
import { FluidDirective } from './directives/fluid.directive';
import { ReadonlyDirective } from './directives/readonly.directive';
import { ReadOnlyDirective } from './directives/read-only.directive';
import { FieldDefaultsComponent } from './components/field/field-defaults.component';
import { CardComponent } from './components/card/card.component';
import { CardGroupComponent } from './components/card-group/card-group.component';
import { MarkdownRendererComponent } from './components/markdown-renderer/markdown-renderer.component';

const standalone = [
    AllowedCharsPipe,
    AnimationComponent,
    AutoComponent,
    AutoDirective,
    ArrayPipe,
    BasicDirective,
    BreadcrumbComponent,
    ButtonComponent,
    ButtonDirective,
    ButtonGroupComponent,
    CardComponent,
    CardGroupComponent,
    CeilPipe,
    CellComponent,
    ChatComponent,
    ChatDefaultsComponent,
    ChatMessageComponent,
    CheckboxComponent,
    CheckboxDefaultsComponent,
    ColorDirective,
    ContextMenuComponent,
    ContextMenuItemComponent,
    DataSourceComponent,
    DateInputComponent,
    DebuggerPipe,
    DebugPipe,
    DimmerComponent,
    DimmerDefaultsComponent,
    DisabledDirective,
    DividerComponent,
    DocumentNoIndexComponent,
    DocumentTitleComponent,
    DropdownComponent,
    DropdownDefaultsComponent,
    DropdownGroupComponent,
    DropdownItemComponent,
    ErrorComponent,
    ExpanderComponent,
    ExpanderDefaultsComponent,
    ExpanderHeaderComponent,
    ExpanderIconComponent,
    ExpanderPartComponent,
    FallbackForDirective,
    FieldComponent,
    FieldDefaultsComponent,
    FieldGroupComponent,
    FileInputComponent,
    FillComponent,
    FillDirective,
    FlagComponent,
    FlexComponent,
    FlexDirective,
    FloorPipe,
    FluidDirective,
    FooterComponent,
    FooterLinkComponent,
    FooterLinkTemplateDirective,
    FormComponent,
    FormDefaultsComponent,
    FormElementRendererComponent,
    FormElementRenderer2Component,
    FormRendererComponent,
    GridComponent,
    GrowComponent,
    GrowDirective,
    HeaderComponent,
    HeaderDirective,
    IconButtonComponent,
    IconComponent,
    InfoComponent,
    InputComponent,
    InputDefaultsComponent,
    InvertedDirective,
    ImageUploadComponent,
    IsFilledPipe,
    IsMailPipe,
    LabelComponent,
    LabelDropdownComponent,
    LabelDropdownDefaultsComponent,
    LayoutComponent,
    LayoutDefaultsComponent,
    LoaderComponent,
    LoadingDirective,
    LogPipe,
    MarkdownRendererComponent,
    MenuComponent,
    MenuHeaderComponent,
    MenuItemComponent,
    MenuItemDirective,
    MenuLinkComponent,
    MenuLinkTemplateDirective,
    MessageComponent,
    MessageDefaultsComponent,
    ModalComponent,
    ModalDefaultsComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    NotificationComponent,
    NumericInputComponent,
    OrComponent,
    PadEndPipe,
    PadStartPipe,
    PositionAbsoluteDirective,
    RadioComponent,
    ReadonlyDirective,
    ReadOnlyDirective,
    RoundPipe,
    RowComponent,
    SafePipe,
    SegmentComponent,
    SegmentDefaultsComponent,
    SegmentGroupComponent,
    ShrinkComponent,
    ShrinkDirective,
    SidebarComponent,
    SliderComponent,
    SubmitComponent,
    TabComponent,
    TabGroupDefaultsComponent,
    TableComponent,
    TableDefaultsComponent,
    TabGroupComponent,
    TextareaComponent,
    TextareaDefaultsComponent,
    TextContainerComponent,
    TimeInputComponent,
    TitlePipe,
    ToBodyDirective,
    ToggleButtonComponent,
    ToggleComponent,
    ToTemplateDirective,
    WarningComponent
];

@NgModule({
    imports: [
        ...standalone
    ],
    exports: [
        ...standalone
    ],
    declarations: []
})
export class ManticUiModule {
}
