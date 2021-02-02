import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { ChatMessage } from '../models/chat-message';

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

    @Output()
    public readonly execute = new EventEmitter<string>();

    public open(url: string): void {
        window.open(url);
    }

    public onExecute(action: string): void {
        this.execute.emit(action);
    }
}
