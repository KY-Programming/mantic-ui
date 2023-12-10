import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { IconComponent } from '../icon/icon.component';
import { MessageComponent } from '../message/message.component';

@Component({
    selector: 'm-warning',
    templateUrl: './warning.component.html',
    styleUrls: ['./warning.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IconComponent
    ],
    providers: [...BaseComponent.providers]
})
export class WarningComponent extends BaseComponent {
    protected readonly defaults = MessageComponent.defaults;

    @Input()
    public showClose = true;

    @Input()
    @HostBinding('class.closed')
    public closed = false;

    @HostBinding('class.visible')
    public get visible(): boolean {
        return !this.closed;
    }

    @Output()
    public readonly close = new EventEmitter<void>();

    public constructor() {
        super();
        this.classes.registerFixed('warning', 'message');
    }

    public onClose(): void {
        this.closed = true;
        this.close.emit();
    }
}
