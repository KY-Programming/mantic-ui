import { Component, input, output } from '@angular/core';
import { ToBodyDirective } from '../../directives/to-body.directive';
import { ModalComponent } from '../modal/modal.component';

/**
 * Shows an image large over the page while it is rendered; any click or Escape asks to close it via `close`.
 * Lives in a modal moved to <body>, so no `overflow`/`transform` of the place it is declared in can clip it.
 */
@Component({
    selector: 'm-image-viewer',
    templateUrl: './image-viewer.component.html',
    styleUrls: ['./image-viewer.component.scss'],
    imports: [ModalComponent, ToBodyDirective],
    host: {
        '(document:keydown.escape)': 'onClose()'
    }
})
export class ImageViewerComponent {
    public readonly src = input.required<string>();
    public readonly alt = input('');

    // eslint-disable-next-line @angular-eslint/no-output-native
    public readonly close = output();

    protected onClose(): void {
        this.close.emit();
    }
}
