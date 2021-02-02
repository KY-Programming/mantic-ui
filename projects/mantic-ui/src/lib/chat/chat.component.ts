import { Component, Input, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatMessage } from '../models/chat-message';
import { InputComponent } from '../input/input.component';

@Component({
    selector: 'm-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
    private readonly sendSubject = new Subject<ChatMessage>();

    @ViewChild(InputComponent)
    public intput: InputComponent;

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
        if (this.message) {
            this.sendSubject.next({ direction: 'out', text: this.message, sender: this.sender, timestamp: Date.now() });
        }
        this.message = undefined;
        this.intput.focus();
    }

    public onKeyDown(event: KeyboardEvent): void {
        if (event.code === 'Enter') {
            this.sendMessage();
        }
    }
}
