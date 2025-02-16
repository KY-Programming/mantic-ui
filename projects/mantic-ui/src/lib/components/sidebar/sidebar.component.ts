import { Component, HostBinding, Input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { FluidDirective } from '../../directives/fluid.directive';
import { InvertedDirective } from '../../directives/inverted.directive';
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
    styleUrls: ['./sidebar.component.scss'],
    hostDirectives: [InvertedDirective.default, FluidDirective.default],
    providers: [...BaseComponent.providers]
})
export class SidebarComponent extends BaseComponent {
    private widthValue: SidebarWidth;
    private isVisible = false;
    private positionValue: SidebarPosition | undefined;
    private noScrollingValue = false;

    @Input()
    public get visible(): boolean {
        return this.isVisible;
    }

    public set visible(value: BooleanLike) {
        this.isVisible = this.toBoolean(value);
        this.classes.set('visible', this.isVisible);
    }

    @Input()
    public get width(): SidebarWidth {
        return this.widthValue;
    }

    public set width(value: SidebarWidth) {
        this.widthValue = value;
        this.classes.set('width', value);
    }

    @Input()
    public get position(): SidebarPosition | undefined {
        return this.positionValue;
    }

    public set position(value: SidebarPosition | undefined) {
        this.positionValue = value;
        this.classes.set('position', value);
    }

    @Input()
    @HostBinding('class.no-scrolling')
    public get noScrolling(): boolean {
        return this.noScrollingValue;
    }

    public set noScrolling(value: BooleanLike) {
        this.noScrollingValue = this.toBoolean(value);
    }

    public constructor() {
        super();
        this.classes.register('width', 'position', 'visible', 'noScrolling')
            .registerFixed('sidebar');
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
