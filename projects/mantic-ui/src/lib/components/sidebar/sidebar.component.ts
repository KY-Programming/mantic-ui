import { Component, HostBinding, Input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { BooleanLike } from '../../models/boolean-like';

export declare type SidebarWidth =
    'thin'
    | 'very thin'
    | 'wide'
    | 'very wide'
    | undefined;

export declare type SidebarPosition =
    'left'
    | 'right'
    | 'top'
    | 'bottom';

@Component({
    selector: 'm-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends BaseComponent {
    private isInverted: boolean;
    private widthValue: SidebarWidth;
    private isVisible: boolean;
    private positionValue: SidebarPosition;
    private isFluid: boolean;
    private noScrollingValue: boolean;

    public get inverted(): boolean {
        return this.isInverted;
    }

    @Input()
    public set inverted(value: BooleanLike) {
        this.isInverted = this.toBoolean(value);
        this.classList.set('inverted', this.isInverted);
    }

    public get visible(): boolean {
        return this.isVisible;
    }

    @Input()
    public set visible(value: BooleanLike) {
        this.isVisible = this.toBoolean(value);
        this.classList.set('visible', this.isVisible);
    }

    public get fluid(): boolean {
        return this.isFluid;
    }

    @Input()
    public set fluid(value: BooleanLike) {
        this.isFluid = this.toBoolean(value);
        this.classList.set('fluid', this.isFluid);
    }

    public get width(): SidebarWidth {
        return this.widthValue;
    }

    @Input()
    public set width(value: SidebarWidth) {
        this.widthValue = value;
        this.classList.set('width', value);
    }

    public get position(): SidebarPosition {
        return this.positionValue;
    }

    @Input()
    public set position(value: SidebarPosition) {
        this.positionValue = value;
        this.classList.set('position', value);
    }

    public get noScrolling(): boolean {
        return this.noScrollingValue;
    }

    @Input()
    @HostBinding('class.no-scrolling')
    public set noScrolling(value: BooleanLike) {
        this.noScrollingValue = this.toBoolean(value);
    }

    public constructor() {
        super();
        this.classList.register('inverted', 'width', 'position', 'visible', 'fluid', 'noScrolling').registerFixed('sidebar');
        this.position = 'left';
        this.visible = true;
        this.refreshClasses();
    }

    public show(): void {
        this.visible = true;
    }

    public hide(): void {
        this.visible = false;
    }
}
