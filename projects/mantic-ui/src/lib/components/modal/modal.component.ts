import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BooleanLike } from '../../models/boolean-like';
import { IconType } from '../icon/icon-type';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InvertibleComponent } from '../../base/invertible.component';

export type ModalSize =
    'mini'
    | 'tiny'
    | 'small'
    | 'large';

@Component({
    selector: 'm-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent extends InvertibleComponent {
    public static readonly defaults = {
        closeIcon: <IconType>'close',
        inverted: false,
        invertedChange: new ReplaySubject<boolean>(1)
    };

    private isShowClose: boolean;
    private isShowHeader = true;
    private isShowFooter = true;
    private isBasic = false;
    private isVisible = true;
    private isImageContent = false;
    private isFullscreen = false;
    private isScrolling = true;
    private isNoPadding = false;

    protected readonly defaults = ModalComponent.defaults;

    @Input()
    public header: string;

    @Input()
    public get showClose(): boolean {
        return this.isShowClose;
    }

    public set showClose(value: BooleanLike) {
        this.isShowClose = this.toBoolean(value);
    }

    @Input()
    public get showHeader(): boolean {
        return this.isShowHeader;
    }

    public set showHeader(value: BooleanLike) {
        this.isShowHeader = this.toBoolean(value);
    }

    @Input()
    public get showFooter(): boolean {
        return this.isShowFooter;
    }

    public set showFooter(value: BooleanLike) {
        this.isShowFooter = this.toBoolean(value);
    }

    @Input()
    public get basic(): boolean {
        return this.isBasic;
    }

    public set basic(value: BooleanLike) {
        this.isBasic = this.toBoolean(value);
    }

    @Input()
    public get visible(): boolean {
        return this.isVisible;
    }

    public set visible(value: BooleanLike) {
        this.isVisible = this.toBoolean(value);
    }

    @Input()
    public get imageContent(): boolean {
        return this.isImageContent;
    }

    public set imageContent(value: BooleanLike) {
        this.isImageContent = this.toBoolean(value);
    }

    @Input()
    public get fullscreen(): boolean {
        return this.isFullscreen;
    }

    public set fullscreen(value: BooleanLike) {
        this.isFullscreen = this.toBoolean(value);
    }

    @Input()
    public size: ModalSize;

    @Input()
    public get scrolling(): boolean {
        return this.isScrolling;
    }

    public set scrolling(value: BooleanLike) {
        this.isScrolling = this.toBoolean(value);
    }

    @Input()
    public get noPadding(): boolean {
        return this.isNoPadding;
    }

    public set noPadding(value: BooleanLike) {
        this.isNoPadding = this.toBoolean(value);
    }

    @Input()
    public minContentHeight: string;

    @Input()
    public maxContentHeight: string;

    @Input()
    public closeIcon: IconType;

    @Output()
    public readonly close = new EventEmitter<void>();

    public constructor() {
        super(false);
        this.classList.register('basic', 'visible', 'fullscreen', 'size', 'scrolling', 'imageContent', 'header', 'footer', 'showHeader', 'showFooter', 'showClose', 'minContentHeight', 'maxContentHeight');
        ModalComponent.defaults.invertedChange.pipe(takeUntil(this.destroy)).subscribe(value => this.refreshInverted(value));
    }

    public onClose(): void {
        this.close.emit();
    }

    public onDimmerClick(event: MouseEvent): void {
        // Only close modal if dimmer was clicked
        if ((event.target as HTMLElement).closest('.modal')) {
            return;
        }
        if (this.showClose || this.showClose === undefined) {
            this.onClose();
        }
    }
}
