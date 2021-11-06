import { Component, ElementRef, HostBinding, HostListener, Input, Output } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Subject } from 'rxjs';

export declare type MessageAttached = 'bottom' | 'top' | undefined;

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
    private isInfo: boolean;
    private isClosable: boolean;
    private isCloseVisible = true;
    private attachedValue: MessageAttached;
    private iconValue: string;

    @Input()
    @HostBinding('class.ignored')
    public get ignored(): boolean | string {
        return this.isIgnored;
    }

    public set ignored(value: string | boolean) {
        this.isIgnored = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.positive')
    public get positive(): boolean | string {
        return this.isPositive;
    }

    public set positive(value: string | boolean) {
        this.isPositive = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.info')
    public get info(): boolean | string {
        return this.isInfo;
    }

    public set info(value: string | boolean) {
        this.isInfo = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.success')
    public get success(): boolean | string {
        return this.isSuccess;
    }

    public set success(value: string | boolean) {
        this.isSuccess = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.warning')
    public get warning(): boolean | string {
        return this.isWarning;
    }

    public set warning(value: string | boolean) {
        this.isWarning = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.error')
    public get error(): boolean | string {
        return this.isError;
    }

    public set error(value: string | boolean) {
        this.isError = this.toBoolean(value);
    }

    public get closable(): boolean | string {
        return this.isClosable;
    }

    @Input()
    public set closable(value: boolean | string) {
        this.isClosable = this.toBoolean(value);
    }

    public get showClose(): boolean | string {
        return this.isCloseVisible;
    }

    @Input()
    public set showClose(value: boolean | string) {
        this.isCloseVisible = this.toBoolean(value);
    }

    public get attached(): MessageAttached {
        return this.attachedValue;
    }

    @Input()
    public set attached(value: MessageAttached) {
        this.attachedValue = value;
        this.classList.set('attached', value ? value + ' attached' : undefined);
    }

    @Input()
    public header: string;

    @Input()
    public get icon(): string {
        return this.iconValue;
    }

    public set icon(value: string) {
        this.iconValue = value;
        this.classList.set('icon', !!value);
    }

    @HostBinding('class.visible')
    @HostBinding('class.message')
    public readonly message = true;

    @Output()
    public readonly close = new Subject<void>();

    constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList.register('ignored', 'positive', 'success', 'warning', 'error', 'attached', 'icon', 'closable');
    }

    @HostListener('click')
    public onClick(): void {
        if (this.closable) {
            this.close.next();
        }
    }
}
