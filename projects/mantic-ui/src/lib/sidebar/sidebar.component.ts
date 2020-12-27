import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

export declare type SidebarWidth =
    'thin'
    | 'very thin'
    | 'wide'
    | 'very wide'
    | undefined;

export declare type SidebarPosition =
    'left'
    | 'right';

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

    public get inverted(): boolean | string {
        return this.isInverted;
    }

    @Input()
    public set inverted(value: boolean | string) {
        this.isInverted = this.toBoolean(value);
        this.classList.set('inverted', this.isInverted);
        this.refreshClasses();
    }

    public get visible(): boolean | string {
        return this.isVisible;
    }

    @Input()
    public set visible(value: boolean | string) {
        this.isVisible = this.toBoolean(value);
        this.classList.set('visible', this.isVisible);
        this.refreshClasses();
    }

    public get width(): SidebarWidth {
        return this.widthValue;
    }

    @Input()
    public set width(value: SidebarWidth) {
        this.widthValue = value;
        this.classList.set('width', value);
        this.refreshClasses();
    }

    public get position(): SidebarPosition {
        return this.positionValue;
    }

    @Input()
    public set position(value: SidebarPosition) {
        this.positionValue = value;
        this.classList.set('position', value);
        this.refreshClasses();
    }

    @HostBinding('class.sidebar')
    public readonly sidebar = true;

    constructor(element: ElementRef<HTMLElement>) {
        super(element);
        this.classList.register('inverted', 'width', 'position', 'visible');
        this.position = 'left';
    }

    public show(): void {
        this.visible = true;
    }

    public hide(): void {
        this.visible = false;
    }
}
