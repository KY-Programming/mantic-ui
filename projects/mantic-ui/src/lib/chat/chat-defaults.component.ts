import { Component, Input, OnDestroy } from '@angular/core';
import { IconType } from '../icon/icon-type';
import { ChatComponent } from './chat.component';
import { IconSize } from '../icon/icon-size';

@Component({
    selector: 'm-chat-defaults',
    template: ''
})
export class ChatDefaultsComponent implements OnDestroy {
    private readonly previousSendIcon = ChatComponent.defaults.sendIcon;
    private readonly previousSendIconSize = ChatComponent.defaults.sendIconSize;
    private currentSendIcon?: IconType;
    private currentSendIconSize?: IconSize;

    @Input()
    public set sendIcon(value: IconType) {
        this.currentSendIcon = value;
        ChatComponent.defaults.sendIcon = value;
    }

    @Input()
    public set sendIconSize(value: IconSize) {
        this.currentSendIconSize = value;
        ChatComponent.defaults.sendIconSize = value;
    }

    public ngOnDestroy(): void {
        if (this.currentSendIcon === ChatComponent.defaults.sendIcon) {
            ChatComponent.defaults.sendIcon = this.previousSendIcon;
        }
        if (this.currentSendIconSize === ChatComponent.defaults.sendIconSize) {
            ChatComponent.defaults.sendIconSize = this.previousSendIconSize;
        }
    }
}
