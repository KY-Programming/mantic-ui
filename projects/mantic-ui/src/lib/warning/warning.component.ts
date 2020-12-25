import { Component, ElementRef, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'm-warning',
    templateUrl: './warning.component.html',
    styleUrls: ['./warning.component.scss']
})
export class WarningComponent extends BaseComponent {

    @Input()
    public showClose = true;

    @Input()
    @HostBinding('class.closed')
    public closed = false;

    @Output()
    public readonly close = new EventEmitter<void>();

    @HostBinding('class.warning')
    @HostBinding('class.message')
    public readonly message = true;

    constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
    }

    public onClose(): void {
        this.closed = true;
        this.close.emit();
    }

}
