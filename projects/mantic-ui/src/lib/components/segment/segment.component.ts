import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { BooleanLike } from '../../models/boolean-like';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColorDirective } from '../../directives/color.directive';
import { BaseComponent } from '../../base/base.component';
import { BasicDirective } from '../../directives/basic.directive';
import { InvertibleComponent } from '../../base/invertible.component';

export declare type SegmentAttached =
    'top'
    | 'bottom';

@Component({
    selector: 'm-segment',
    templateUrl: './segment.component.html',
    styleUrls: ['./segment.component.scss'],
    standalone: true,
    hostDirectives: [
        BasicDirective.default,
        ColorDirective.default
    ],
    providers: [...BaseComponent.providers]
})
export class SegmentComponent extends InvertibleComponent implements OnInit {
    public static readonly defaults = {
        inverted: false,
        invertedChange: new ReplaySubject<boolean>(1),
        raised: false,
        raisedChange: new ReplaySubject<boolean>(1)
    };

    private isVertical: boolean;
    private isRaised: boolean;
    private isRaisedChanged = false;
    private isPlaceholder: boolean;
    private isSecondary: boolean;
    private isTertiary: boolean;
    private attachedValue: SegmentAttached;
    private isNoPadding: boolean;
    private isLoading: boolean;

    @Input()
    public get raised(): boolean {
        return this.isRaised;
    }

    public set raised(value: BooleanLike) {
        this.isRaisedChanged = true;
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

    @Input()
    @HostBinding('class.loading')
    public get loading(): boolean {
        return this.isLoading;
    }

    public set loading(value: BooleanLike) {
        this.isLoading = this.toBoolean(value);
    }

    @HostBinding('class.segment')
    public readonly segment = true;

    public constructor() {
        super();
        this.classList.register('raised', 'vertical', 'placeholder', 'basic', 'secondary', 'tertiary', 'color', 'attached', 'attachedValue', 'noPadding', 'loading');
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        SegmentComponent.defaults.invertedChange.pipe(takeUntil(this.destroy)).subscribe(value => this.refreshInverted(value));
        SegmentComponent.defaults.raisedChange.pipe(takeUntil(this.destroy)).subscribe(value => this.refreshRaised(value));
    }

    private refreshRaised(value: boolean): void {
        if (this.isRaisedChanged) {
            return;
        }
        this.raised = value;
        this.isRaisedChanged = false;
    }
}
