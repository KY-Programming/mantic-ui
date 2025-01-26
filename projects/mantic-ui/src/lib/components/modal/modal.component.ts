import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, inject, Input, Output } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InvertibleComponent } from '../../base/invertible.component';
import { BasicDirective } from '../../directives/basic.directive';
import { FallbackForDirective } from '../../directives/fallback-for.directive';
import { BooleanLike } from '../../models/boolean-like';
import { ButtonComponent } from '../button/button.component';
import { DimmerComponent } from '../dimmer/dimmer.component';
import { IconType } from '../icon/icon-type';
import { IconComponent } from '../icon/icon.component';
import { LoaderComponent } from '../loader/loader.component';
import { ModalFooterComponent } from './modal-footer.component';
import { ModalHeaderComponent } from './modal-header.component';

export type ModalSize =
    'mini'
    | 'tiny'
    | 'small'
    | 'large';

@Component({
    selector: 'm-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    imports: [CommonModule, DimmerComponent, ModalHeaderComponent, ModalFooterComponent, IconComponent, ButtonComponent, LoaderComponent, FallbackForDirective],
    hostDirectives: [BasicDirective.default],
    providers: [...InvertibleComponent.providers]
})
export class ModalComponent extends InvertibleComponent {
    public static readonly defaults = {
        closeIcon: <IconType>'close',
        inverted: false,
        invertedChange: new ReplaySubject<boolean>(1)
    };

    private isShowClose = false;
    private isShowHeader = true;
    private isShowFooter = true;
    private isHideDimmer = false;
    private isVisible = true;
    private isImageContent = false;
    private isFullscreen = false;
    private isScrolling = true;
    private isNoPadding = false;
    private isLoading = false;

    private readonly basicDirective = inject(BasicDirective, { self: true });
    protected readonly defaults = ModalComponent.defaults;

    protected get basic(): boolean {
        return this.basicDirective.basic;
    }

    @Input()
    public header: string | undefined;

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
    public get hideHeader(): boolean {
        return !this.isShowHeader;
    }

    public set hideHeader(value: BooleanLike) {
        this.isShowHeader = !this.toBoolean(value);
    }

    @Input()
    public get showFooter(): boolean {
        return this.isShowFooter;
    }

    public set showFooter(value: BooleanLike) {
        this.isShowFooter = this.toBoolean(value);
    }

    @Input()
    public get hideFooter(): boolean {
        return !this.isShowFooter;
    }

    public set hideFooter(value: BooleanLike) {
        this.isShowFooter = !this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.hide-dimmer')
    public get hideDimmer(): boolean {
        return this.isHideDimmer;
    }

    public set hideDimmer(value: BooleanLike) {
        this.isHideDimmer = this.toBoolean(value);
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
    public size: ModalSize | undefined;

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
    public get loading(): boolean {
        return this.isLoading;
    }

    public set loading(value: BooleanLike) {
        this.isLoading = this.toBoolean(value);
    }

    @Input()
    public minContentHeight: string | undefined;

    @Input()
    public maxContentHeight: string | undefined;

    @Input()
    public closeIcon: IconType | undefined;

    @Output()
    public readonly close = new EventEmitter<void>();

    public constructor() {
        super(false);
        this.classes.register('visible', 'fullscreen', 'size', 'scrolling', 'imageContent', 'header', 'footer', 'showHeader', 'hideHeader', 'showFooter', 'hideFooter', 'hideDimmer', 'showClose', 'minContentHeight', 'maxContentHeight');
        ModalComponent.defaults.invertedChange.pipe(takeUntil(this.destroy)).subscribe(value => this.refreshInverted(value));
    }

    protected onClose(): void {
        this.close.emit();
    }

    protected onDimmerClick(event: MouseEvent): void {
        // Only close modal if dimmer was clicked
        if ((event.target as HTMLElement).closest('.modal')) {
            return;
        }
        if (this.showClose || this.showClose === undefined) {
            this.onClose();
        }
    }
}
