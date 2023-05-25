import { Component, Input, OnInit } from '@angular/core';
import { BooleanLike } from '../../models/boolean-like';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColorDirective } from '../../directives/color.directive';
import { BasicDirective } from '../../directives/basic.directive';
import { InvertibleComponent } from '../../base/invertible.component';
import { LoadingDirective } from '../../directives/loading.directive';

export declare type SegmentAttached =
    'top'
    | 'bottom';

@Component({
    selector: 'm-segment',
    templateUrl: './segment.component.html',
    styleUrls: ['./segment.component.scss'],
    standalone: true,
    hostDirectives: SegmentComponent.directives,
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
    protected static override readonly directives = [...InvertibleComponent.directives, BasicDirective.default, ColorDirective.default, LoadingDirective.default];

    private isVertical = false;
    private isRaised = false;
    private isRaisedChanged = false;
    private isPlaceholder = false;
    private isSecondary = false;
    private isTertiary = false;
    private attachedValue: SegmentAttached | undefined;
    private isNoPadding = false;

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

    public constructor() {
        super();
        this.classes.register('raised', 'vertical', 'placeholder', 'secondary', 'tertiary', 'attached', 'attachedValue', 'noPadding')
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
