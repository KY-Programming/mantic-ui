import { Directive, HostBinding, Input } from '@angular/core';
import { BaseComponent } from './base.component';
import { BooleanLike } from '../models/boolean-like';
import { ColorDirective } from '../directives/color.directive';
import { BasicDirective } from '../directives/basic.directive';
import { InvertedDirective } from '../directives/inverted.directive';
import { DisabledDirective } from '../directives/disabled.directive';
import { LoadingDirective } from '../directives/loading.directive';
import { ActiveDirective } from '../directives/active.directive';

@Directive()
export abstract class ButtonBaseComponent extends BaseComponent {
    protected static override readonly providers = [...BaseComponent.providers];
    protected static override readonly directives = [ColorDirective.default, BasicDirective.default, InvertedDirective.default, DisabledDirective.default, LoadingDirective.default, ActiveDirective.default];
    private sizeValue = '';
    private isPrimary = false;
    private isSecondary = false;
    private isPositive = false;
    private isNegative = false;
    private isCircular = false;
    private isAttachedLeft = false;
    private isAttachedTop = false;
    private isAttachedRight = false;
    private isAttachedBottom = false;

    @Input()
    @HostBinding('class.primary')
    public get primary(): boolean {
        return this.isPrimary;
    }

    public set primary(value: BooleanLike) {
        this.isPrimary = this.toBoolean(value);
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
    @HostBinding('class.positive')
    public get positive(): boolean {
        return this.isPositive;
    }

    public set positive(value: BooleanLike) {
        this.isPositive = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.negative')
    public get negative(): boolean {
        return this.isNegative;
    }

    public set negative(value: BooleanLike) {
        this.isNegative = this.toBoolean(value);
    }

    public get size(): string {
        return this.sizeValue;
    }

    @Input()
    public set size(value: string) {
        this.sizeValue = value;
        this.classes.set('size', value);
    }

    @Input()
    @HostBinding('class.circular')
    public get circular(): boolean {
        return this.isCircular;
    }

    public set circular(value: BooleanLike) {
        this.isCircular = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.left')
    public get attachedLeft(): boolean {
        return this.isAttachedLeft;
    }

    public set attachedLeft(value: BooleanLike) {
        this.isAttachedLeft = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.top')
    public get attachedTop(): boolean {
        return this.isAttachedTop;
    }

    public set attachedTop(value: BooleanLike) {
        this.isAttachedTop = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.right')
    public get attachedRight(): boolean {
        return this.isAttachedRight;
    }

    public set attachedRight(value: BooleanLike) {
        this.isAttachedRight = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.bottom')
    public get attachedBottom(): boolean {
        return this.isAttachedBottom;
    }

    public set attachedBottom(value: BooleanLike) {
        this.isAttachedBottom = this.toBoolean(value);
    }

    @HostBinding('class.attached')
    protected get attached(): boolean {
        return this.isAttachedTop || this.attachedBottom || this.attachedLeft || this.attachedRight;
    }

    @HostBinding('class.button')
    protected readonly button = true;

    protected constructor() {
        super();
        this.elementRef.nativeElement.setAttribute('tabindex', '0');
        this.classes.register('size', 'primary', 'secondary', 'positive', 'negative', 'circular', 'tabindex', 'attachedLeft', 'attachedRight', 'attachedTop', 'attachedBottom');
    }
}
