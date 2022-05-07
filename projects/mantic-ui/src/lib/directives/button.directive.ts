import { Directive, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { ColorName } from '../models/color';
import { BaseDirective } from '../base/base.directive';

@Directive({
    selector: '[m-button]'
})
export class ButtonDirective extends BaseDirective implements OnInit {
    private sizeValue: string;
    private colorValue: ColorName;
    private isInverted: boolean;
    private isPrimary: boolean;
    private isSecondary: boolean;
    private isPositive: boolean;
    private isNegative: boolean;
    private isBasic: boolean;
    private isActive: boolean;
    private isDisabled: boolean;
    private isLoading: boolean;
    private isCircular: boolean;
    private isAttachedLeft: boolean;
    private isAttachedTop: boolean;
    private isAttachedRight: boolean;
    private isAttachedBottom: boolean;
    private iconValue: string;
    private isFluid: boolean;

    @Input()
    @HostBinding('class.inverted')
    public get inverted(): boolean {
        return this.isInverted;
    }

    public set inverted(value: string | boolean) {
        this.isInverted = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.primary')
    public get primary(): boolean {
        return this.isPrimary;
    }

    public set primary(value: string | boolean) {
        this.isPrimary = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.secondary')
    public get secondary(): boolean {
        return this.isSecondary;
    }

    public set secondary(value: string | boolean) {
        this.isSecondary = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.positive')
    public get positive(): boolean {
        return this.isPositive;
    }

    public set positive(value: string | boolean) {
        this.isPositive = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.negative')
    public get negative(): boolean {
        return this.isNegative;
    }

    public set negative(value: string | boolean) {
        this.isNegative = this.toBoolean(value);
    }

    public get color(): ColorName {
        return this.colorValue;
    }

    @Input()
    public set color(value: ColorName) {
        this.colorValue = value;
        this.classList.set('color', value);
    }

    @Input()
    @HostBinding('class.basic')
    public get basic(): boolean {
        return this.isBasic;
    }

    public set basic(value: string | boolean) {
        this.isBasic = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.active')
    public get active(): boolean {
        return this.isActive;
    }

    public set active(value: string | boolean) {
        this.isActive = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.disabled')
    public get disabled(): boolean {
        return this.isDisabled;
    }

    public set disabled(value: string | boolean) {
        this.isDisabled = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.loading')
    public get loading(): boolean {
        return this.isLoading;
    }

    public set loading(value: string | boolean) {
        this.isLoading = this.toBoolean(value);
    }

    public get size(): string {
        return this.sizeValue;
    }

    @Input()
    public set size(value: string) {
        this.sizeValue = value;
        this.classList.set('size', value);
    }

    @Input()
    @HostBinding('class.circular')
    public get circular(): boolean {
        return this.isCircular;
    }

    public set circular(value: string | boolean) {
        this.isCircular = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.attached-left')
    public get attachedLeft(): boolean {
        return this.isAttachedLeft;
    }

    public set attachedLeft(value: string | boolean) {
        this.isAttachedLeft = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.attached-top')
    public get attachedTop(): boolean {
        return this.isAttachedTop;
    }

    public set attachedTop(value: string | boolean) {
        this.isAttachedTop = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.attached-right')
    public get attachedRight(): boolean {
        return this.isAttachedRight;
    }

    public set attachedRight(value: string | boolean) {
        this.isAttachedRight = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.attached-bottom')
    public get attachedBottom(): boolean {
        return this.isAttachedBottom;
    }

    public set attachedBottom(value: string | boolean) {
        this.isAttachedBottom = this.toBoolean(value);
    }

    @Input()
    public get icon(): string {
        return this.iconValue;
    }

    public set icon(value: string) {
        this.iconValue = value;
        this.classList.set('icon', !!value);
        this.classList.set('iconLabeled', value ? 'labeled' : undefined);
    }

    @Input()
    @HostBinding('class.fluid')
    public get fluid(): boolean | string {
        return this.isFluid;
    }

    public set fluid(value: string | boolean) {
        this.isFluid = this.toBoolean(value);
    }

    @HostBinding('class.button')
    public button = true;

    public constructor(
        public readonly elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        elementRef.nativeElement.setAttribute('tabindex', '0');
        this.classList.register('size', 'inverted', 'primary', 'secondary', 'positive', 'negative', 'circular', 'color', 'basic', 'active', 'disabled', 'loading', 'tabindex', 'attachedLeft', 'attachedRight', 'attachedTop', 'attachedBottom');
    }

    public override ngOnInit(): void {
        super.ngOnInit();
    }
}
