import { Component, effect, input, OnDestroy } from '@angular/core';
import { IconType } from '../icon/models/icon-type';
import { ModalComponent } from './modal.component';

@Component({
    selector: 'm-modal-defaults',
    template: ''
})
export class ModalDefaultsComponent implements OnDestroy {
    private readonly previousCloseIcon = ModalComponent.defaults.closeIcon();
    private currentCloseIcon?: IconType;
    public readonly closeIcon = input<IconType>();
    public readonly inverted = input<boolean>();

    public constructor() {
        effect(() => {
            const value = this.closeIcon();
            if (value !== undefined) {
                this.currentCloseIcon = value;
                ModalComponent.defaults.closeIcon.set(value);
            }
        });
        effect(() => {
            const value = this.inverted();
            if (value !== undefined) {
                ModalComponent.defaults.inverted.set(value);
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.currentCloseIcon === ModalComponent.defaults.closeIcon()) {
            ModalComponent.defaults.closeIcon.set(this.previousCloseIcon);
        }
    }
}
