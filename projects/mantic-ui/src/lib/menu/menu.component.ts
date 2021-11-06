import { Component, ElementRef, HostBinding, Input, Optional, SkipSelf } from '@angular/core';
import { BaseComponent } from '../base/base.component';

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
    public get fixed(): boolean | string {
        return this.isFixed;
    }

    public set fixed(value: string | boolean) {
        this.isFixed = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.secondary')
    public get secondary(): boolean | string {
        return this.isSecondary;
    }

    public set secondary(value: string | boolean) {
        this.isSecondary = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.pointing')
    public get pointing(): boolean | string {
        return this.isPointing;
    }

    public set pointing(value: string | boolean) {
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
    public get tabular(): boolean | string {
        return this.isTabular;
    }

    public set tabular(value: string | boolean) {
        this.isTabular = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.text')
    public get text(): boolean | string {
        return this.isText;
    }

    public set text(value: string | boolean) {
        this.isText = this.toBoolean(value);
    }

    @HostBinding('class.menu')
    public readonly menu = true;

    public constructor(
        elementRef: ElementRef<HTMLElement>,
        @Optional() @SkipSelf() parentMenu?: MenuComponent
    ) {
        super(elementRef, !parentMenu);
        this.classList.register('position', 'fixed', 'pointing', 'secondary', 'tabular', 'text', 'attached');
    }
}
