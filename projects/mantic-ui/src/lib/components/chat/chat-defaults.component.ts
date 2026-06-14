import { Component, effect, input, OnDestroy } from '@angular/core';
import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';
import { ChatComponent } from './chat.component';

@Component({
    selector: 'm-chat-defaults',
    template: ''
})
export class ChatDefaultsComponent implements OnDestroy {
    private readonly previousSendIcon = ChatComponent.defaults.sendIcon();
    private readonly previousSendIconSize = ChatComponent.defaults.sendIconSize();
    private currentSendIcon?: IconType;
    private currentSendIconSize?: IconSize;
    public readonly sendIcon = input<IconType>();
    public readonly sendIconSize = input<IconSize>();

    public constructor() {
        effect(() => {
            const value = this.sendIcon();
            if (value !== undefined) {
                this.currentSendIcon = value;
                ChatComponent.defaults.sendIcon.set(value);
            }
        });
        effect(() => {
            const value = this.sendIconSize();
            if (value !== undefined) {
                this.currentSendIconSize = value;
                ChatComponent.defaults.sendIconSize.set(value);
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.currentSendIcon === ChatComponent.defaults.sendIcon()) {
            ChatComponent.defaults.sendIcon.set(this.previousSendIcon);
        }
        if (this.currentSendIconSize === ChatComponent.defaults.sendIconSize()) {
            ChatComponent.defaults.sendIconSize.set(this.previousSendIconSize);
        }
    }
}
