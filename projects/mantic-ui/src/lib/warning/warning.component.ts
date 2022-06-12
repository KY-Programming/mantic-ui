import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { MessageComponent } from '../message/message.component';

@Component({
    selector: 'm-warning',
    templateUrl: './warning.component.html',
    styleUrls: ['./warning.component.scss']
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

    @HostBinding('class.warning')
    @HostBinding('class.message')
    public readonly message = true;

    public constructor() {
        super();
    }

    public onClose(): void {
        this.closed = true;
        this.close.emit();
    }
}
