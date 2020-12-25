import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { DimmableComponent } from '../base/dimmable.component';
import { DimmableService } from '../services/dimmable.service';
import { FieldSize, fieldSizes } from '../models/field-size';
import { ColorName } from '../models/color';

export declare type SegmentAttached = 'top' | 'bottom';

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

    @Input()
    @HostBinding('class.inverted')
    public get inverted(): boolean | string {
        return this.isInverted;
    }

    public set inverted(value: string | boolean) {
        this.isInverted = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.raised')
    public get raised(): boolean | string {
        return this.isRaised;
    }

    public set raised(value: string | boolean) {
        this.isRaised = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.vertical')
    public get vertical(): boolean | string {
        return this.isVertical;
    }

    public set vertical(value: string | boolean) {
        this.isVertical = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.placeholder')
    public get placeholder(): boolean | string {
        return this.isPlaceholder;
    }

    public set placeholder(value: string | boolean) {
        this.isPlaceholder = this.toBoolean(value);
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
    @HostBinding('class.secondary')
    public get secondary(): boolean | string {
        return this.isSecondary;
    }

    public set secondary(value: string | boolean) {
        this.isSecondary = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.tertiary')
    public get tertiary(): boolean | string {
        return this.isTertiary;
    }

    public set tertiary(value: string | boolean) {
        this.isTertiary = this.toBoolean(value);
    }

    public get color(): ColorName {
        return this.colorValue;
    }

    @Input()
    @HostBinding('class.attached')
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
        this.classList.set('attached', value);
        this.refreshClasses();
    }
    @HostBinding('class.segment')
    public readonly segment = true;

    public constructor(
        elementRef: ElementRef<HTMLElement>,
        dimmableService: DimmableService
    ) {
        super(elementRef, dimmableService);
        this.raised = SegmentComponent.defaults.raised;
        this.classList
            .registerBoolean('inverted')
            .registerBoolean('raised')
            .registerBoolean('vertical')
            .registerBoolean('placeholder')
            .registerBoolean('basic')
            .registerBoolean('secondary')
            .registerBoolean('tertiary')
            .register('color');
            // .registerAction('attached', (entry, value) => entry.classes = value ? value + ' attached' : '')
    }
}
