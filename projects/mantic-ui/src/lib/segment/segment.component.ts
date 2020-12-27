import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { DimmableComponent } from '../base/dimmable.component';
import { DimmableService } from '../services/dimmable.service';
import { ColorName } from '../models/color';

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
    public get inverted(): boolean | string {
        return this.isInverted;
    }

    public set inverted(value: string | boolean) {
        this.isInverted = this.toBoolean(value);
        this.classList.set('inverted', this.isInverted);
        this.refreshClasses();
    }

    @Input()
    public get raised(): boolean | string {
        return this.isRaised;
    }

    public set raised(value: string | boolean) {
        this.isRaised = this.toBoolean(value);
        this.classList.set('raised', this.isRaised);
        this.refreshClasses();
    }

    @Input()
    public get vertical(): boolean | string {
        return this.isVertical;
    }

    public set vertical(value: string | boolean) {
        this.isVertical = this.toBoolean(value);
        this.classList.set('vertical', this.isVertical);
        this.refreshClasses();
    }

    @Input()
    public get placeholder(): boolean | string {
        return this.isPlaceholder;
    }

    public set placeholder(value: string | boolean) {
        this.isPlaceholder = this.toBoolean(value);
        this.classList.set('placeholder', this.isPlaceholder);
        this.refreshClasses();
    }

    @Input()
    public get basic(): boolean | string {
        return this.isBasic;
    }

    public set basic(value: string | boolean) {
        this.isBasic = this.toBoolean(value);
        this.classList.set('basic', this.isBasic);
        this.refreshClasses();
    }

    @Input()
    public get secondary(): boolean | string {
        return this.isSecondary;
    }

    public set secondary(value: string | boolean) {
        this.isSecondary = this.toBoolean(value);
        this.classList.set('secondary', this.isSecondary);
        this.refreshClasses();
    }

    @Input()
    public get tertiary(): boolean | string {
        return this.isTertiary;
    }

    public set tertiary(value: string | boolean) {
        this.isTertiary = this.toBoolean(value);
        this.classList.set('tertiary', this.isTertiary);
        this.refreshClasses();
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

    public get attached(): SegmentAttached {
        return this.attachedValue;
    }

    @Input()
    public set attached(value: SegmentAttached) {
        this.attachedValue = value;
        this.classList.set('attachedValue', value);
        this.classList.set('attached', !!value);
        this.refreshClasses();
    }

    @Input()
    public get noPadding(): boolean | string {
        return this.isNoPadding;
    }

    public set noPadding(value: string | boolean) {
        this.isNoPadding = this.toBoolean(value);
        this.classList.set('noPadding', this.isNoPadding ? 'no-padding' : undefined);
        this.refreshClasses();
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
