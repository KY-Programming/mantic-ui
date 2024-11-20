import { CommonModule, NgIfContext } from '@angular/common';
import { Component, DoCheck, ElementRef, Input, IterableDiffer, IterableDiffers, Output, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { ChatMessage } from '../../models/chat-message';
import { ButtonComponent } from '../button/button.component';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { IconSize } from '../icon/icon-size';
import { IconType } from '../icon/icon-type';
import { IconComponent } from '../icon/icon.component';
import { InputComponent } from '../input/text/input.component';

@Component({
    selector: 'm-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    imports: [
        CommonModule,
        ChatMessageComponent,
        InputComponent,
        ButtonComponent,
        IconComponent
    ]
})
export class ChatComponent implements DoCheck {
    public static readonly defaults = { sendIcon: <IconType>'caret right', sendIconSize: <IconSize>'big' };
    private readonly sendSubject = new Subject<ChatMessage>();
    private readonly messagesDiffer: IterableDiffer<unknown>;
    protected readonly defaults = ChatComponent.defaults;
    private canSendValue = true;
    protected isSendIconVisible = false;

    @Input()
    public messages: ChatMessage[] = [];

    public message: string | undefined;

    @Input()
    public get canSend(): boolean {
        return this.canSendValue;
    }

    public set canSend(value: BooleanLike) {
        this.canSendValue = toBoolean(value);
    }

    @Input()
    public sender: string | undefined;

    @Input()
    // eslint-disable-next-line no-null/no-null
    public sendIconTemplate: TemplateRef<NgIfContext<boolean>> | null = null;

    @Input()
    public sendIcon: IconType | undefined;

    @Input()
    public sendIconSize: IconSize;

    @Input()
    public get showSendIcon(): boolean {
        return this.isSendIconVisible;
    }

    public set showSendIcon(value: BooleanLike) {
        this.isSendIconVisible = toBoolean(value);
    }

    @Input()
    public placeholder = 'Type a message and send with ENTER';

    @Output()
    public readonly send = this.sendSubject.asObservable();

    @ViewChild('chat')
    protected chat: ElementRef<HTMLElement> | undefined;

    @ViewChild(InputComponent)
    protected input: InputComponent | undefined;

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

    protected sendMessage(): void {
        if (this.message) {
            this.sendSubject.next({ direction: 'out', text: this.message, sender: this.sender ?? 'Unknown', timestamp: Date.now() });
        }
        this.message = undefined;
        this.input?.setFocus();
    }

    protected onKeyDown(event: KeyboardEvent): void {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            this.sendMessage();
        }
    }

    private scrollDown(): void {
        setTimeout(() => this.chat?.nativeElement.scrollTo(0, 999999));
    }
}
