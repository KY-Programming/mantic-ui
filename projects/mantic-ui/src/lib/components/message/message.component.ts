import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InvertibleComponent } from '../../base/invertible.component';
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
    imports: [
        CommonModule,
        IconComponent,
        LoaderComponent
    ],
    hostDirectives: [IgnoredDirective.default],
    providers: [...InvertibleComponent.providers]
})
export class MessageComponent extends InvertibleComponent implements OnInit {
    public static readonly defaults = {
        closeIcon: <IconType>'close',
        closeIconSize: <IconSize>undefined,
        inverted: false,
        invertedChange: new ReplaySubject<boolean>(1)
    };

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
    public readonly close = new EventEmitter<MouseEvent>();

    public constructor() {
        super();
        this.classes.register('positive', 'success', 'warning', 'error', 'attached', 'icon', 'closable')
            .registerFixed('visible', 'message');
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        MessageComponent.defaults.invertedChange.pipe(takeUntil(this.destroy)).subscribe(value => this.refreshInverted(value));
    }

    @HostListener('click', ['$event'])
    private onClick(event: MouseEvent): void {
        const selection = window.getSelection();
        if (selection && this.elementRef.nativeElement.contains(selection?.focusNode) && (selection.anchorNode !== selection.focusNode || selection.anchorOffset !== selection.focusOffset)) {
            return;
        }
        if (this.closable) {
            this.close.next(event);
        }
    }
}
