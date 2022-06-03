import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { DimmableComponent } from '../base/dimmable.component';
import { DimmableService } from '../services/dimmable.service';
import { ColorName } from '../models/color';
import { BooleanLike } from '../models/boolean-like';

export declare type SegmentAttached =
    'top'
    | 'bottom';

@Component({
    selector: 'm-segment',
    templateUrl: './segment.component.html',
    styleUrls: ['./segment.component.scss'],
    providers: [DimmableService]
})
export class SegmentComponent extends DimmableComponent {
    public static readonly defaults = { raised: false };

    private isVertical: boolean;
    private isInverted: boolean;
    private isRaised: boolean;
    private isPlaceholder: boolean;
    private isBasic: boolean;
    private isSecondary: boolean;
    private isTertiary: boolean;
    private attachedValue: SegmentAttached;
    private colorValue: ColorName;
    private isNoPadding: boolean;

    @Input()
    public get inverted(): boolean {
        return this.isInverted;
    }

    public set inverted(value: BooleanLike) {
        this.isInverted = this.toBoolean(value);
        this.classList.set('inverted', this.isInverted);
    }

    @Input()
    public get raised(): boolean {
        return this.isRaised;
    }

    public set raised(value: BooleanLike) {
        this.isRaised = this.toBoolean(value);
        this.classList.set('raised', this.isRaised);
    }

    @Input()
    public get vertical(): boolean {
        return this.isVertical;
    }

    public set vertical(value: BooleanLike) {
        this.isVertical = this.toBoolean(value);
        this.classList.set('vertical', this.isVertical);
    }

    @Input()
    public get placeholder(): boolean {
        return this.isPlaceholder;
    }

    public set placeholder(value: BooleanLike) {
        this.isPlaceholder = this.toBoolean(value);
        this.classList.set('placeholder', this.isPlaceholder);
    }

    @Input()
    public get basic(): boolean {
        return this.isBasic;
    }

    public set basic(value: BooleanLike) {
        this.isBasic = this.toBoolean(value);
        this.classList.set('basic', this.isBasic);
    }

    @Input()
    public get secondary(): boolean {
        return this.isSecondary;
    }

    public set secondary(value: BooleanLike) {
        this.isSecondary = this.toBoolean(value);
        this.classList.set('secondary', this.isSecondary);
    }

    @Input()
    public get tertiary(): boolean {
        return this.isTertiary;
    }

    public set tertiary(value: BooleanLike) {
        this.isTertiary = this.toBoolean(value);
        this.classList.set('tertiary', this.isTertiary);
    }

    public get color(): ColorName {
        return this.colorValue;
    }

    @Input()
    public set color(value: ColorName) {
        this.colorValue = value;
        this.classList.set('color', value);
    }

    public get attached(): SegmentAttached {
        return this.attachedValue;
    }

    @Input()
    public set attached(value: SegmentAttached) {
        this.attachedValue = value;
        this.classList.set('attachedValue', value, false);
        this.classList.set('attached', !!value);
    }

    @Input()
    public get noPadding(): boolean {
        return this.isNoPadding;
    }

    public set noPadding(value: BooleanLike) {
        this.isNoPadding = this.toBoolean(value);
        this.classList.set('noPadding', this.isNoPadding ? 'no-padding' : undefined);
    }

    @HostBinding('class.segment')
    public readonly segment = true;

    public constructor(
        elementRef: ElementRef<HTMLElement>,
        dimmableService: DimmableService
    ) {
        super(elementRef, dimmableService);
        this.classList.register('inverted', 'raised', 'vertical', 'placeholder', 'basic', 'secondary', 'tertiary', 'color', 'attached', 'attachedValue', 'noPadding');
        this.raised = SegmentComponent.defaults.raised;
    }
}
