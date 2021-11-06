import { Component, DoCheck, ElementRef, Input, IterableDiffer, IterableDiffers, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatMessage } from '../models/chat-message';
import { InputComponent } from '../input/input.component';

@Component({
    selector: 'm-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements DoCheck {
    private readonly sendSubject = new Subject<ChatMessage>();
    private readonly messagesDiffer: IterableDiffer<unknown>;

    @ViewChild('chat')
    public chat: ElementRef<HTMLElement>;

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

    public constructor(
        iterableDiffers: IterableDiffers
    ) {
        this.messagesDiffer = iterableDiffers.find([]).create(undefined);
    }

    public ngDoCheck(): void {
        if (this.messagesDiffer.diff(this.messages)) {
            this.scrollDown();
        }
    }

    public sendMessage(): void {
        if (this.message) {
            this.sendSubject.next({ direction: 'out', text: this.message, sender: this.sender, timestamp: Date.now() });
        }
        this.message = undefined;
        this.intput.focus();
    }

    public onKeyDown(event: KeyboardEvent): void {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            this.sendMessage();
        }
    }

    private scrollDown(): void {
        setTimeout(() => this.chat?.nativeElement.scrollTo(0, 999999));
    }
}
