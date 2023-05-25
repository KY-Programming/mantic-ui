import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent, ContextMenuComponent, ContextMenuItemComponent, DimmerComponent, ErrorComponent, FillDirective, HeaderDirective, InfoComponent, MessageComponent, ModalComponent, ModalFooterComponent, SegmentComponent, WarningComponent } from '@mantic-ui/angular';

@Component({
    selector: 'app-special-list',
    standalone: true,
    imports: [CommonModule, RouterLink, SegmentComponent, ButtonComponent, ContextMenuComponent, ContextMenuItemComponent, DimmerComponent, HeaderDirective, FillDirective, ModalComponent, ModalFooterComponent, InfoComponent, WarningComponent, ErrorComponent, MessageComponent],
    templateUrl: './special-list.component.html',
    styleUrls: ['./special-list.component.scss']
})
export class SpecialListExamplesComponent {
    public showDimmer = true;
    public showModal = false;

    @HostBinding('class.component-grid')
    public readonly host = true;

    public prevent(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
    }
}
