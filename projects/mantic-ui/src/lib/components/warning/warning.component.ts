
import { Component, EventEmitter, HostBinding, Output, ChangeDetectionStrategy, input } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { InvertibleComponent } from '../../base/invertible.component';
import { IconComponent } from '../icon/icon.component';
import { MessageComponent } from '../message/message.component';

@Component({
    selector: 'm-warning',
    templateUrl: './warning.component.html',
    styleUrls: ['./warning.component.scss'],
    imports: [
    IconComponent
],
    changeDetection: ChangeDetectionStrategy.Eager,
    providers: [...InvertibleComponent.providers]
})
export class WarningComponent extends InvertibleComponent {
    protected readonly defaults = MessageComponent.defaults;

    public readonly showClose = input(true);

    @HostBinding('class.closed')
public readonly closed = input(false);

    @HostBinding('class.visible')
    public get visible(): boolean {
        return !this.closed();
    }

    @Output()
    public readonly close = new EventEmitter<void>();

    public constructor() {
        super();
        this.classes.registerFixed('warning', 'message');
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        MessageComponent.defaults.invertedChange.pipe(takeUntil(this.destroy)).subscribe(value => this.refreshInverted(value));
    }

    public onClose(): void {
        this.closed = true;
        this.close.emit();
    }
}
