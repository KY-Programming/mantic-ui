import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { BaseComponent } from '../base/base.component';

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
export class ModalComponent extends BaseComponent {
    private isShowClose: boolean;
    private isShowHeader = true;
    private isShowFooter = true;
    private isBasic = false;
    private isVisible = true;
    private isImageContent = false;
    private isFullscreen = false;
    private isScrolling = true;

    @Input()
    public header: string;

    @Input()
    public get showClose(): boolean {
        return this.isShowClose;
    }

    public set showClose(value: boolean | string) {
        this.isShowClose = this.toBoolean(value);
    }

    @Input()
    public get showHeader(): boolean {
        return this.isShowHeader;
    }

    public set showHeader(value: boolean | string) {
        this.isShowHeader = this.toBoolean(value);
    }

    @Input()
    public get showFooter(): boolean {
        return this.isShowFooter;
    }

    public set showFooter(value: boolean | string) {
        this.isShowFooter = this.toBoolean(value);
    }

    @Input()
    public get basic(): boolean {
        return this.isBasic;
    }

    public set basic(value: boolean | string) {
        this.isBasic = this.toBoolean(value);
    }

    @Input()
    public get visible(): boolean {
        return this.isVisible;
    }

    public set visible(value: boolean | string) {
        this.isVisible = this.toBoolean(value);
    }

    @Input()
    public get imageContent(): boolean {
        return this.isImageContent;
    }

    public set imageContent(value: boolean | string) {
        this.isImageContent = this.toBoolean(value);
    }

    @Input()
    public get fullscreen(): boolean {
        return this.isFullscreen;
    }

    public set fullscreen(value: boolean | string) {
        this.isFullscreen = this.toBoolean(value);
    }

    @Input()
    public size: ModalSize;

    @Input()
    public get scrolling(): boolean {
        return this.isScrolling;
    }

    public set scrolling(value: boolean | string) {
        this.isScrolling = this.toBoolean(value);
    }

    @Input()
    public minContentHeight: string;

    @Input()
    public maxContentHeight: string;

    @Output()
    public readonly close = new EventEmitter<void>();

    constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef, false);
        this.classList.register('basic', 'visible', 'fullscreen', 'size', 'scrolling', 'imageContent', 'header', 'footer', 'showHeader', 'showFooter', 'minContentHeight', 'maxContentHeight');
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
