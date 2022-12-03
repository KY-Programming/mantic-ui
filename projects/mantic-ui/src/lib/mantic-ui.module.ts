import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { ExternalRouteComponent } from './helpers/external-route.component';
import { TableComponent } from './components/table/table.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { PadStartPipe } from './pipes/pad-start.pipe';
import { PadEndPipe } from './pipes/pad-end.pipe';
import { FormRendererComponent } from './components/form-renderer/form-renderer.component';
import { AsInputPipe } from './components/form-element-renderer/pipes/as-input.pipe';
import { AsCheckboxPipe } from './components/form-element-renderer/pipes/as-checkbox.pipe';
import { AsFieldsPipe } from './components/form-element-renderer/pipes/as-fields.pipe';
import { FormElementRendererComponent } from './components/form-element-renderer/form-element-renderer.component';
import { FlagComponent } from './components/flag/flag.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { AsAreaPipe } from './components/form-element-renderer/pipes/as-area.pipe';
import { AsDropDownPipe } from './components/form-element-renderer/pipes/as-drop-down.pipe';
import { DataSourceComponent } from './components/data-source/data-source.component';
import { AsButtonPipe } from './components/form-element-renderer/pipes/as-button.pipe';
import { FormElementRenderer2Component } from './components/form-element-renderer/form-element-renderer2.component';
import { AsGridPipe } from './components/form-element-renderer/pipes/as-grid.pipe';
import { AsLabelPipe } from './components/form-element-renderer/pipes/as-label.pipe';
import { RouterModule } from '@angular/router';
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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalDefaultsComponent } from './components/modal/modal-defaults.component';
import { ChatDefaultsComponent } from './components/chat/chat-defaults.component';
import { ExpanderDefaultsComponent } from './components/expander/expander-defaults.component';
import { LabelDropdownDefaultsComponent } from './components/label-dropdown/label-dropdown-defaults.component';
import { LayoutDefaultsComponent } from './components/layout/layout-defaults.component';
import { DropdownDefaultsComponent } from './components/dropdown/dropdown-defaults.component';
import { MessageDefaultsComponent } from './components/message/message-defaults.component';
import { CheckboxDefaultsComponent } from './components/checkbox/checkbox-defaults.component';
import { AsMessagePipe } from './components/form-element-renderer/pipes/as-message.pipe';
import { TableDefaultsComponent } from './components/table/table-defaults.component';
import { FormDefaultsComponent } from './components/form/form-defaults.component';
import { AsHeaderPipe } from './components/form-element-renderer/pipes/as-header.pipe';
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

@NgModule({
    declarations: [
        ButtonGroupComponent,
        SegmentDefaultsComponent,
        SegmentGroupComponent,
        DividerComponent,
        OrComponent,
        InputComponent,
        NumericInputComponent,
        DateInputComponent,
        LabelDropdownComponent,
        LabelDropdownDefaultsComponent,
        MenuComponent,
        LayoutComponent,
        LayoutDefaultsComponent,
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
        DropdownDefaultsComponent,
        DropdownItemComponent,
        MenuLinkComponent,
        FooterLinkComponent,
        MenuHeaderComponent,
        HeaderComponent,
        MenuItemDirective,
        SafePipe,
        CheckboxComponent,
        CheckboxDefaultsComponent,
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
        FormDefaultsComponent,
        FieldComponent,
        FieldGroupComponent,
        MessageComponent,
        MessageDefaultsComponent,
        RowComponent,
        TextareaComponent,
        IsFilledPipe,
        IsMailPipe,
        LogPipe,
        DebuggerPipe,
        DebugPipe,
        TitlePipe,
        ExternalRouteComponent,
        TableDefaultsComponent,
        NotificationComponent,
        ChatComponent,
        ChatDefaultsComponent,
        ChatMessageComponent,
        PadStartPipe,
        PadEndPipe,
        FormRendererComponent,
        AsInputPipe,
        AsCheckboxPipe,
        AsFieldsPipe,
        FormElementRendererComponent,
        FlagComponent,
        AsAreaPipe,
        AsDropDownPipe,
        DataSourceComponent,
        AsButtonPipe,
        FormElementRenderer2Component,
        AsGridPipe,
        AsLabelPipe,
        AsMessagePipe,
        AsHeaderPipe,
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
        DocumentNoIndexComponent,
        ExpanderComponent,
        ExpanderDefaultsComponent,
        ExpanderHeaderComponent,
        ContextMenuComponent,
        ContextMenuItemComponent,
        FileInputComponent,
        DropdownGroupComponent,
        ExpanderIconComponent,
        ExpanderPartComponent,
        InputDefaultsComponent,
        TextareaDefaultsComponent,
        TabGroupDefaultsComponent,
        DimmerDefaultsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        FontAwesomeModule,
        // Standalone
        BasicDirective,
        ButtonComponent,
        ButtonDirective,
        ColorDirective,
        DimmerComponent,
        FallbackForDirective,
        HeaderDirective,
        IconButtonComponent,
        IconComponent,
        InvertedDirective,
        ImageUploadComponent,
        LabelComponent,
        LoaderComponent,
        ModalComponent,
        ModalDefaultsComponent,
        ModalFooterComponent,
        ModalHeaderComponent,
        SegmentComponent,
        SidebarComponent,
        SubmitComponent,
        TableComponent,
        TimeInputComponent,
        ToggleButtonComponent
    ],
    exports: [
        ColorDirective,
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
        LabelDropdownDefaultsComponent,
        MenuComponent,
        LayoutComponent,
        LayoutDefaultsComponent,
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
        DropdownDefaultsComponent,
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
        CheckboxDefaultsComponent,
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
        FormDefaultsComponent,
        FieldComponent,
        FieldGroupComponent,
        MessageComponent,
        MessageDefaultsComponent,
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
        TableDefaultsComponent,
        NotificationComponent,
        SidebarComponent,
        LoaderComponent,
        ChatComponent,
        ChatDefaultsComponent,
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
        DocumentNoIndexComponent,
        ExpanderComponent,
        ExpanderDefaultsComponent,
        ExpanderHeaderComponent,
        ContextMenuComponent,
        ContextMenuItemComponent,
        FileInputComponent,
        ModalDefaultsComponent,
        DropdownGroupComponent,
        ExpanderIconComponent,
        ExpanderPartComponent,
        InputDefaultsComponent,
        TextareaDefaultsComponent,
        TabGroupDefaultsComponent,
        DimmerDefaultsComponent,
        TimeInputComponent
    ]
})
export class ManticUiModule {
}
