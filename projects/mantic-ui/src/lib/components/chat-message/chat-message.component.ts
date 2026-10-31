import { Component, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { ButtonDirective } from '../button/button.directive';
import { ChatImage } from '../chat/models/chat-image';
import { ChatMessage } from '../chat/models/chat-message';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';

@Component({
    selector: 'm-chat-message',
    templateUrl: './chat-message.component.html',
    styleUrls: ['./chat-message.component.scss'],
    imports: [ButtonComponent, ButtonDirective, ImageViewerComponent, RouterLink],
    host: {
        '[class.in]': 'message()?.direction === \'in\'',
        '[class.out]': 'message()?.direction === \'out\'',
        '[class.grouped]': 'message()?.grouped ?? false'
    }
})
export class ChatMessageComponent {
    /** The image (or sender picture) shown large over the page, after a click on it */
    protected readonly openedImage = signal<ChatImage | undefined>(undefined);
    public readonly message = input.required<ChatMessage | undefined>();
    public readonly execute = output<string>();

    public open(url: string): void {
        window.open(url);
    }

    public onExecute(action: string): void {
        this.execute.emit(action);
    }

    protected openImage(image: ChatImage): void {
        this.openedImage.set(image);
    }

    protected closeImage(): void {
        this.openedImage.set(undefined);
    }
}
