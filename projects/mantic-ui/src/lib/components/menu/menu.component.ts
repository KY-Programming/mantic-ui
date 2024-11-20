import { Component, HostBinding, Input, Optional, SkipSelf } from '@angular/core';
import { InvertibleComponent } from '../../base/invertible.component';
import { PointingDirective } from '../../directives/pointing.directive';
import { BooleanLike } from '../../models/boolean-like';

export declare type MenuPosition =
    'top'
    | 'left'
    | 'bottom'
    | 'right'
    | undefined;

@Component({
    selector: 'm-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    hostDirectives: [PointingDirective.default],
    providers: [...InvertibleComponent.providers]
})
export class MenuComponent extends InvertibleComponent {
    private isFixed = false;
    private positionValue: MenuPosition;
    private isSecondary = false;
    private attachedValue: MenuPosition;
    private isTabular = false;
    private isText = false;
    private isVertical = false;

    public readonly element = this.elementRef;

    public get position(): MenuPosition {
        return this.positionValue;
    }

    @Input()
    public set position(value: MenuPosition) {
        this.positionValue = value;
        this.classes.set('position', value);
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

    public get attached(): MenuPosition {
        return this.attachedValue;
    }

    @Input()
    @HostBinding('class.attached')
    public set attached(value: MenuPosition) {
        this.attachedValue = value;
        this.classes.set('attached', value);
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

    public constructor(
        @Optional() @SkipSelf() parentMenu?: MenuComponent
    ) {
        super(!parentMenu);
        this.classes.registerFixed('menu');
        this.classes.register('position', 'fixed', 'secondary', 'tabular', 'text', 'attached', 'vertical');
    }
}
