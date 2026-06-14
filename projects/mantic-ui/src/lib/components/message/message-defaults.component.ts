import { Component, effect, input, OnDestroy } from '@angular/core';
import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';
import { MessageComponent } from './message.component';

@Component({
    selector: 'm-message-defaults',
    template: ''
})
export class MessageDefaultsComponent implements OnDestroy {
    private readonly previousCloseIcon = MessageComponent.defaults.closeIcon();
    private readonly previousCloseIconSize = MessageComponent.defaults.closeIconSize();
    private currentCloseIcon?: IconType;
    private currentCloseIconSize?: IconType;
    public readonly closeIcon = input<IconType>();
    public readonly closeIconSize = input<IconSize>();
    public readonly inverted = input<boolean>();

    public constructor() {
        effect(() => {
            const value = this.closeIcon();
            if (value !== undefined) {
                this.currentCloseIcon = value;
                MessageComponent.defaults.closeIcon.set(value);
            }
        });
        effect(() => {
            const value = this.closeIconSize();
            if (value !== undefined) {
                this.currentCloseIconSize = value;
                MessageComponent.defaults.closeIconSize.set(value);
            }
        });
        effect(() => {
            const value = this.inverted();
            if (value !== undefined) {
                MessageComponent.defaults.inverted.set(value);
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.currentCloseIcon === MessageComponent.defaults.closeIcon()) {
            MessageComponent.defaults.closeIcon.set(this.previousCloseIcon);
        }
        if (this.currentCloseIconSize === MessageComponent.defaults.closeIconSize()) {
            MessageComponent.defaults.closeIconSize.set(this.previousCloseIconSize);
        }
    }
}
