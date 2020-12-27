import { Component, HostBinding, Input } from '@angular/core';
import { ChatMessage } from './chat-message';

@Component({
    selector: 'm-chat-message',
    templateUrl: './chat-message.component.html',
    styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent {

    @Input()
    public message: ChatMessage;

    @HostBinding('class.in')
    public get in(): boolean {
        return this.message?.direction === 'in';
    }

    @HostBinding('class.out')
    public get out(): boolean {
        return this.message?.direction === 'out';
    }

    @HostBinding('class.grouped')
    public get grouped(): boolean {
        return this.message?.grouped;
    }
}
