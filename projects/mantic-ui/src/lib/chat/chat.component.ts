import { Component, Input, OnInit, Output } from '@angular/core';
import { ChatMessage } from '../chat-message/chat-message';
import { Subject } from 'rxjs';

@Component({
    selector: 'm-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
    private readonly sendSubject = new Subject<ChatMessage>();

    @Input()
    public messages: ChatMessage[];

    public message: string;

    @Input()
    public canSend = true;

    @Input()
    public sender: string;

    @Output()
    public readonly send = this.sendSubject.asObservable();

    public sendMessage(): void {
        this.sendSubject.next({direction: 'out', text: this.message, sender: this.sender, timestamp: Date.now()});
        this.message = undefined;
    }

    public onKeyDown(event: KeyboardEvent): void {
        if (event.code === 'Enter') {
            this.sendMessage();
        }
    }
}
