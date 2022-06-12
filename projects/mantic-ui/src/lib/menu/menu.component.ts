import { Component, HostBinding, Input, Optional, SkipSelf } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { BooleanLike } from '../models/boolean-like';

export declare type MenuPosition =
    'top'
    | 'left'
    | 'bottom'
    | 'right'
    | undefined;

@Component({
    selector: 'm-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends BaseComponent {
    private isFixed: boolean;
    private positionValue: MenuPosition;
    private isSecondary: boolean;
    private isPointing: boolean;
    private attachedValue: MenuPosition;
    private isTabular: boolean;
    private isText: boolean;
    private isVertical: boolean;

    public readonly element = this.elementRef;

    public get position(): MenuPosition {
        return this.positionValue;
    }

    @Input()
    public set position(value: MenuPosition) {
        this.positionValue = value;
        this.classList.set('position', value);
    }

    @Input()
    @HostBinding('class.fixed')
    public get fixed(): boolean {
        return this.isFixed;
    }

    public set fixed(value: BooleanLike) {
        this.isFixed = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.secondary')
    public get secondary(): boolean {
        return this.isSecondary;
    }

    public set secondary(value: BooleanLike) {
        this.isSecondary = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.pointing')
    public get pointing(): boolean {
        return this.isPointing;
    }

    public set pointing(value: BooleanLike) {
        this.isPointing = this.toBoolean(value);
    }

    public get attached(): MenuPosition {
        return this.attachedValue;
    }

    @Input()
    @HostBinding('class.attached')
    public set attached(value: MenuPosition) {
        this.attachedValue = value;
        this.classList.set('attached', value);
    }

    @Input()
    @HostBinding('class.tabular')
    public get tabular(): boolean {
        return this.isTabular;
    }

    public set tabular(value: BooleanLike) {
        this.isTabular = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.text')
    public get text(): boolean {
        return this.isText;
    }

    public set text(value: BooleanLike) {
        this.isText = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.vertical')
    public get vertical(): boolean {
        return this.isVertical;
    }

    public set vertical(value: BooleanLike) {
        this.isVertical = this.toBoolean(value);
    }

    @HostBinding('class.menu')
    public readonly menu = true;

    public constructor(
        @Optional() @SkipSelf() parentMenu?: MenuComponent
    ) {
        super(!parentMenu);
        this.classList.register('position', 'fixed', 'pointing', 'secondary', 'tabular', 'text', 'attached', 'vertical');
    }
}
