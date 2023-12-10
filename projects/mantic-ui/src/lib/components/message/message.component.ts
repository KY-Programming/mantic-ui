import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { IgnoredDirective } from '../../directives/ignored.directive';
import { BooleanLike } from '../../models/boolean-like';
import { IconSize } from '../icon/icon-size';
import { IconType } from '../icon/icon-type';
import { IconComponent } from '../icon/icon.component';
import { LoaderComponent } from '../loader/loader.component';

export declare type MessageAttached = 'bottom' | 'top' | undefined;

@Component({
    selector: 'm-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IconComponent,
        LoaderComponent
    ],
    hostDirectives: [IgnoredDirective.default],
    providers: [...BaseComponent.providers]
})
export class MessageComponent extends BaseComponent {
    public static readonly defaults = { closeIcon: <IconType>'close', closeIconSize: <IconSize>undefined };

    private isPositive = false;
    private isSuccess = false;
    private isWarning = false;
    private isError = false;
    private isInfo = false;
    private isClosable = false;
    private isCloseVisible = true;
    private isLoading = false;
    private attachedValue: MessageAttached;
    private iconValue: IconType | undefined;

    protected readonly defaults = MessageComponent.defaults;

    @Input()
    @HostBinding('class.positive')
    public get positive(): boolean {
        return this.isPositive;
    }

    public set positive(value: BooleanLike) {
        this.isPositive = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.info')
    public get info(): boolean {
        return this.isInfo;
    }

    public set info(value: BooleanLike) {
        this.isInfo = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.success')
    public get success(): boolean {
        return this.isSuccess;
    }

    public set success(value: BooleanLike) {
        this.isSuccess = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.warning')
    public get warning(): boolean {
        return this.isWarning;
    }

    public set warning(value: BooleanLike) {
        this.isWarning = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.error')
    public get error(): boolean {
        return this.isError;
    }

    public set error(value: BooleanLike) {
        this.isError = this.toBoolean(value);
    }

    @Input()
    public get closable(): boolean {
        return this.isClosable;
    }

    public set closable(value: BooleanLike) {
        this.isClosable = this.toBoolean(value);
    }

    @Input()
    public get showClose(): boolean {
        return this.isCloseVisible;
    }

    public set showClose(value: BooleanLike) {
        this.isCloseVisible = this.toBoolean(value);
    }

    @Input()
    public get loading(): boolean {
        return this.isLoading;
    }

    public set loading(value: BooleanLike) {
        this.isLoading = this.toBoolean(value);
        this.classes.set('icon', this.isLoading || !!this.iconValue);
    }

    @Input()
    public get attached(): MessageAttached {
        return this.attachedValue;
    }

    public set attached(value: MessageAttached) {
        this.attachedValue = value;
        this.classes.set('attached', value ? value + ' attached' : undefined);
    }

    @Input()
    public header: string | undefined;

    @Input()
    public get icon(): IconType | undefined {
        return this.iconValue;
    }

    public set icon(value: IconType | undefined) {
        this.iconValue = value;
        this.classes.set('icon', !!value);
    }

    @Input()
    public iconSize: IconSize;

    @Input()
    public closeIcon: IconType | undefined;

    @Input()
    public closeIconSize: IconSize;

    @Output()
    public readonly close = new EventEmitter<void>();

    public constructor() {
        super();
        this.classes.register('positive', 'success', 'warning', 'error', 'attached', 'icon', 'closable')
            .registerFixed('visible', 'message');
    }

    @HostListener('click')
    private onClick(): void {
        if (this.closable) {
            this.close.next();
        }
    }
}
