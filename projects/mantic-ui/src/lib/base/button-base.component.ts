import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { ColorName } from '../models/color';
import { BaseComponent } from './base.component';

@Component({
    template: ''
})
export class ButtonBaseComponent extends BaseComponent {
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

    @Input()
    @HostBinding('class.inverted')
    public get inverted(): boolean | string {
        return this.isInverted;
    }

    public set inverted(value: string | boolean) {
        this.isInverted = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.primary')
    public get primary(): boolean | string {
        return this.isPrimary;
    }

    public set primary(value: string | boolean) {
        this.isPrimary = this.toBoolean(value);
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
    @HostBinding('class.positive')
    public get positive(): boolean | string {
        return this.isPositive;
    }

    public set positive(value: string | boolean) {
        this.isPositive = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.negative')
    public get negative(): boolean | string {
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
        this.refreshClasses();
    }

    @Input()
    @HostBinding('class.basic')
    public get basic(): boolean | string {
        return this.isBasic;
    }

    public set basic(value: string | boolean) {
        this.isBasic = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.active')
    public get active(): boolean | string {
        return this.isActive;
    }

    public set active(value: string | boolean) {
        this.isActive = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.disabled')
    public get disabled(): boolean | string {
        return this.isDisabled;
    }

    public set disabled(value: string | boolean) {
        this.isDisabled = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.loading')
    public get loading(): boolean | string {
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
        this.refreshClasses();
    }

    @Input()
    @HostBinding('class.circular')
    public get circular(): boolean | string {
        return this.isCircular;
    }

    public set circular(value: string | boolean) {
        this.isCircular = this.toBoolean(value);
    }

    @HostBinding('class.button')
    public button = true;

    public constructor(
        public readonly elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        elementRef.nativeElement.setAttribute('tabindex', '0');
        this.classList
            .register('size')
            .register('inverted')
            .register('primary')
            .register('secondary')
            .register('positive')
            .register('negative')
            .register('circular')
            .register('color')
            .register('basic')
            .register('active')
            .register('disabled')
            .register('loading');
    }

    public ngOnInit(): void {
        super.ngOnInit();
    }
}
