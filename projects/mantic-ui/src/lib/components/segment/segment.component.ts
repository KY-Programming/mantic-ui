import { Component, Input, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InvertibleComponent } from '../../base/invertible.component';
import { BasicDirective } from '../../directives/basic.directive';
import { ColorDirective } from '../../directives/color.directive';
import { LoadingDirective } from '../../directives/loading.directive';
import { BooleanLike } from '../../models/boolean-like';

export declare type SegmentAttached =
    'top'
    | 'bottom';

@Component({
    selector: 'm-segment',
    templateUrl: './segment.component.html',
    styleUrls: ['./segment.component.scss'],
    hostDirectives: [BasicDirective.default, ColorDirective.default, LoadingDirective.default],
    providers: SegmentComponent.providers
})
export class SegmentComponent extends InvertibleComponent implements OnInit {
    public static readonly defaults = {
        inverted: false,
        invertedChange: new ReplaySubject<boolean>(1),
        raised: false,
        raisedChange: new ReplaySubject<boolean>(1)
    };
    protected static override readonly providers = [...InvertibleComponent.providers];

    private isVertical = false;
    private isRaised = false;
    private isRaisedChanged = false;
    private isPlaceholder = false;
    private isSecondary = false;
    private isTertiary = false;
    private attachedValue: SegmentAttached | undefined;
    private isNoPadding = false;
    private isNoMargin = false;

    @Input()
    public get raised(): boolean {
        return this.isRaised;
    }

    public set raised(value: BooleanLike) {
        this.isRaisedChanged = true;
        this.isRaised = this.toBoolean(value);
        this.classes.set('raised', this.isRaised);
    }

    @Input()
    public get vertical(): boolean {
        return this.isVertical;
    }

    public set vertical(value: BooleanLike) {
        this.isVertical = this.toBoolean(value);
        this.classes.set('vertical', this.isVertical);
    }

    @Input()
    public get placeholder(): boolean {
        return this.isPlaceholder;
    }

    public set placeholder(value: BooleanLike) {
        this.isPlaceholder = this.toBoolean(value);
        this.classes.set('placeholder', this.isPlaceholder);
    }

    @Input()
    public get secondary(): boolean {
        return this.isSecondary;
    }

    public set secondary(value: BooleanLike) {
        this.isSecondary = this.toBoolean(value);
        this.classes.set('secondary', this.isSecondary);
    }

    @Input()
    public get tertiary(): boolean {
        return this.isTertiary;
    }

    public set tertiary(value: BooleanLike) {
        this.isTertiary = this.toBoolean(value);
        this.classes.set('tertiary', this.isTertiary);
    }

    public get attached(): SegmentAttached | undefined {
        return this.attachedValue;
    }

    @Input()
    public set attached(value: SegmentAttached | undefined) {
        this.attachedValue = value;
        this.classes.set('attachedValue', value);
        this.classes.set('attached', !!value);
    }

    @Input()
    public get noPadding(): boolean {
        return this.isNoPadding;
    }

    public set noPadding(value: BooleanLike) {
        this.isNoPadding = this.toBoolean(value);
        this.classes.set('noPadding', this.isNoPadding ? 'no-padding' : undefined);
    }

    @Input()
    public get noMargin(): boolean {
        return this.isNoMargin;
    }

    public set noMargin(value: BooleanLike) {
        this.isNoMargin = this.toBoolean(value);
        this.classes.set('noMargin', this.isNoMargin ? 'no-margin' : undefined);
    }

    public constructor() {
        super();
        this.classes.register('raised', 'vertical', 'placeholder', 'secondary', 'tertiary', 'attached', 'attachedValue', 'noPadding', 'noMargin')
            .registerFixed('segment');
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
