import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { ButtonDirective } from '../button/button.directive';
import { ChatMessage } from '../chat/models/chat-message';

@Component({
    selector: 'm-chat-message',
    templateUrl: './chat-message.component.html',
    styleUrls: ['./chat-message.component.scss'],
    imports: [ButtonComponent, ButtonDirective, RouterLink],
    host: {
        '[class.in]': 'message()?.direction === \'in\'',
        '[class.out]': 'message()?.direction === \'out\'',
        '[class.grouped]': 'message()?.grouped ?? false'
    }
})
export class ChatMessageComponent {
    public readonly message = input.required<ChatMessage | undefined>();
    public readonly execute = output<string>();

    public open(url: string): void {
        window.open(url);
    }

    public onExecute(action: string): void {
        this.execute.emit(action);
    }
}
