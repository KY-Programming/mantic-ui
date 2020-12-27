import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'm-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent extends BaseComponent {
    private isIgnored: boolean;
    private isPositive: boolean;
    private isSuccess: boolean;
    private isWarning: boolean;
    private isError: boolean;

    @HostBinding('class.ignored')
    public get ignored(): boolean | string {
        return this.isIgnored;
    }

    public set ignored(value: string | boolean) {
        this.isIgnored = this.toBoolean(value);
    }

    @HostBinding('class.positive')
    public get positive(): boolean | string {
        return this.isPositive;
    }

    public set positive(value: string | boolean) {
        this.isPositive = this.toBoolean(value);
    }

    @HostBinding('class.success')
    public get success(): boolean | string {
        return this.isSuccess;
    }

    public set success(value: string | boolean) {
        this.isSuccess = this.toBoolean(value);
    }

    @HostBinding('class.warning')
    public get warning(): boolean | string {
        return this.isWarning;
    }

    public set warning(value: string | boolean) {
        this.isWarning = this.toBoolean(value);
    }

    @HostBinding('class.error')
    public get error(): boolean | string {
        return this.isError;
    }

    public set error(value: string | boolean) {
        this.isError = this.toBoolean(value);
    }

    @Input()
    public header: string;

    @HostBinding('class.message')
    public readonly message = true;

    constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList.register('ignored', 'positive', 'success', 'warning', 'error');
    }

}
