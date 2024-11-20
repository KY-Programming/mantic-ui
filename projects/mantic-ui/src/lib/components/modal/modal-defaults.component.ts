import { Component, Input, OnDestroy } from '@angular/core';
import { ModalComponent } from './modal.component';
import { IconType } from '../icon/icon-type';

@Component({
    selector: 'm-modal-defaults',
    template: '',
    })
export class ModalDefaultsComponent implements OnDestroy {
    private readonly previousCloseIcon = ModalComponent.defaults.closeIcon;
    private currentCloseIcon?: IconType;

    @Input()
    public set closeIcon(value: IconType) {
        this.currentCloseIcon = value;
        ModalComponent.defaults.closeIcon = value;
    }

    @Input()
    public set inverted(value: boolean) {
        ModalComponent.defaults.inverted = value;
        ModalComponent.defaults.invertedChange.next(value);
    }

    public ngOnDestroy(): void {
        if (this.currentCloseIcon === ModalComponent.defaults.closeIcon) {
            ModalComponent.defaults.closeIcon = this.previousCloseIcon;
        }
    }
}
