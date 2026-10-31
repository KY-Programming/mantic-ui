import { Component, effect, input, InputSignal, OnDestroy } from '@angular/core';
import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';
import { ChatComponent } from './chat.component';

type ChatDefaultKey = keyof typeof ChatComponent.defaults;

@Component({
    selector: 'm-chat-defaults',
    template: ''
})
export class ChatDefaultsComponent implements OnDestroy {
    private readonly restores: (() => void)[] = [];
    public readonly sendIcon = input<IconType>();
    public readonly sendIconSize = input<IconSize>();
    public readonly attachIcon = input<IconType>();
    public readonly attachImageIcon = input<IconType>();
    public readonly screenshotIcon = input<IconType>();
    public readonly photoIcon = input<IconType>();

    public constructor() {
        this.bind('sendIcon', this.sendIcon);
        this.bind('sendIconSize', this.sendIconSize);
        this.bind('attachIcon', this.attachIcon);
        this.bind('attachImageIcon', this.attachImageIcon);
        this.bind('screenshotIcon', this.screenshotIcon);
        this.bind('photoIcon', this.photoIcon);
    }

    public ngOnDestroy(): void {
        for (const restore of this.restores) {
            restore();
        }
    }

    // Sets the default while the input has a value; on destroy the previous default comes back, unless someone else changed it meanwhile
    private bind<TKey extends ChatDefaultKey>(key: TKey, value: InputSignal<ReturnType<typeof ChatComponent.defaults[TKey]> | undefined>): void {
        const target = ChatComponent.defaults[key] as unknown as { (): unknown; set(value: unknown): void };
        const previous = target();
        let current: unknown;
        effect(() => {
            const next = value();
            if (next !== undefined) {
                current = next;
                target.set(next);
            }
        });
        this.restores.push(() => {
            if (current !== undefined && current === target()) {
                target.set(previous);
            }
        });
    }
}
