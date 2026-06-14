import { NgIfContext, NgTemplateOutlet } from '@angular/common';
import { Component, DoCheck, ElementRef, inject, input, IterableDiffer, IterableDiffers, signal, TemplateRef, viewChild } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { ButtonComponent } from '../button/button.component';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { IconComponent } from '../icon/icon.component';
import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';
import { InputComponent } from '../input/text/input.component';
import { ChatMessage } from './models/chat-message';

@Component({
    selector: 'm-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    imports: [
        ChatMessageComponent,
        InputComponent,
        ButtonComponent,
        IconComponent,
        NgTemplateOutlet
    ]
})
export class ChatComponent implements DoCheck {
    public static readonly defaults = {
        sendIcon: signal<IconType>('caret right'),
        sendIconSize: signal<IconSize>('big')
    };
    private readonly sendSubject = new Subject<ChatMessage>();
    private readonly messagesDiffer: IterableDiffer<unknown>;
    protected readonly defaults = ChatComponent.defaults;
    public readonly messages = input<ChatMessage[]>([]);
    public message: string | undefined;
    public readonly canSend = input<boolean, BooleanLike>(true, { transform: toBoolean });
    public readonly sender = input<string>();
    // eslint-disable-next-line unicorn/no-null
    public readonly sendIconTemplate = input<TemplateRef<NgIfContext<boolean>> | null>(null);
    public readonly sendIcon = input<IconType>();
    public readonly sendIconSize = input<IconSize>();
    public readonly showSendIcon = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly placeholder = input('Type a message and send with ENTER');
    public readonly send = outputFromObservable(this.sendSubject);
    protected readonly chat = viewChild<ElementRef<HTMLElement>>('chat');
    protected readonly input = viewChild(InputComponent);

    public constructor() {
        this.messagesDiffer = inject(IterableDiffers).find([]).create(undefined);
    }

    public ngDoCheck(): void {
        if (this.messagesDiffer.diff(this.messages())) {
            this.scrollDown();
        }
    }

    protected sendMessage(): void {
        if (this.message) {
            this.sendSubject.next({ direction: 'out', text: this.message, sender: this.sender() ?? 'Unknown', timestamp: Date.now() });
        }
        this.message = undefined;
        this.input()?.setFocus();
    }

    protected onKeyDown(event: KeyboardEvent): void {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            this.sendMessage();
        }
    }

    private scrollDown(): void {
        setTimeout(() => this.chat()?.nativeElement.scrollTo(0, 999_999));
    }
}
