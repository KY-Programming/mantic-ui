import { Component, DoCheck, ElementRef, Input, IterableDiffer, IterableDiffers, Output, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatMessage } from '../models/chat-message';
import { InputComponent } from '../input/text/input.component';
import { IconType } from '../icon/icon-type';
import { IconSize } from '../icon/icon-size';

@Component({
    selector: 'm-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements DoCheck {
    public static readonly defaults = { sendIcon: <IconType>'caret right', sendIconSize: <IconSize>'big' };
    private readonly sendSubject = new Subject<ChatMessage>();
    private readonly messagesDiffer: IterableDiffer<unknown>;
    protected readonly defaults = ChatComponent.defaults;

    @ViewChild('chat')
    public chat: ElementRef<HTMLElement>;

    @ViewChild(InputComponent)
    public input: InputComponent;

    @Input()
    public messages: ChatMessage[];

    public message: string;

    @Input()
    public canSend = true;

    @Input()
    public sender: string;

    @Input()
    public sendIconTemplate: TemplateRef<never>;

    @Input()
    public sendIcon: IconType;

    @Input()
    public sendIconSize: IconSize;

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
        this.input.setFocus();
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
