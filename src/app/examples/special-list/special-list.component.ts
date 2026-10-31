import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';

import { RouterLink } from '@angular/router';
import { ButtonComponent, ChatMessage, ChatMessageComponent, ContextMenuComponent, ContextMenuItemComponent, DimmerComponent, ErrorComponent, FillDirective, FlexDirective, HeaderDirective, InfoComponent, MessageComponent, ModalComponent, ModalFooterComponent, SegmentComponent, WarningComponent } from '@mantic-ui/angular';

@Component({
    selector: 'app-special-list',
    imports: [RouterLink, SegmentComponent, ButtonComponent, ChatMessageComponent, ContextMenuComponent, ContextMenuItemComponent, DimmerComponent, HeaderDirective, FlexDirective, FillDirective, ModalComponent, ModalFooterComponent, InfoComponent, WarningComponent, ErrorComponent, MessageComponent],
    templateUrl: './special-list.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./special-list.component.scss']
})
export class SpecialListExamplesComponent {
    public showDimmer = true;
    public showModal = false;
    public readonly chatMessages: ChatMessage[] = [
        { direction: 'in', sender: 'Jenny', text: 'Hi, how is it going?' },
        { direction: 'out', sender: 'You', text: '', grouped: true, images: [{ url: 'assets/images/avatar/small/matt.jpg', name: 'matt.jpg' }] }
    ];

    @HostBinding('class.component-grid')
    public readonly host = true;

    public prevent(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
    }
}
