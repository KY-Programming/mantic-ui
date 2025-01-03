import { Component, Input, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InvertibleComponent } from '../../base/invertible.component';
import { BasicDirective } from '../../directives/basic.directive';
import { BooleanLike } from '../../models/boolean-like';

export declare type Align =
    | 'top'
    | 'bottom'
    | 'middle';

@Component({
    selector: 'm-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    hostDirectives: [BasicDirective.default],
    providers: [...InvertibleComponent.providers]
})
export class TableComponent extends InvertibleComponent implements OnInit {
    public static readonly defaults = {
        inverted: false,
        invertedChange: new ReplaySubject<boolean>(1)
    };

    private isCelled = true;
    private isUnstackable = false;
    private isVery = false;
    private alignedValue: Align | undefined;
    private isDefinition = false;
    private isCollapsing = false;

    @Input()
    public get celled(): boolean {
        return this.isCelled;
    }

    public set celled(value: BooleanLike) {
        this.isCelled = this.toBoolean(value);
        this.classes.set('celled', this.isCelled);
    }

    @Input()
    public get notCelled(): boolean {
        return !this.celled;
    }

    public set notCelled(value: BooleanLike) {
        this.celled = !this.toBoolean(value);
    }

    @Input()
    public get very(): boolean {
        return this.isVery;
    }

    public set very(value: BooleanLike) {
        this.isVery = this.toBoolean(value);
        this.classes.set('very', this.isVery);
    }

    @Input()
    public get unstackable(): boolean {
        return this.isUnstackable;
    }

    public set unstackable(value: BooleanLike) {
        this.isUnstackable = this.toBoolean(value);
        this.classes.set('unstackable', this.isUnstackable);
    }

    @Input()
    public get aligned(): Align | undefined {
        return this.alignedValue;
    }

    public set aligned(value: Align | undefined) {
        this.alignedValue = value;
        this.classes.set('aligned', value ? value + ' aligned' : undefined);
    }

    @Input()
    public get definition(): boolean {
        return this.isDefinition;
    }

    public set definition(value: BooleanLike) {
        this.isDefinition = this.toBoolean(value);
        this.classes.set('definition', this.isDefinition);
    }

    @Input()
    public get collapsing(): boolean {
        return this.isCollapsing;
    }

    public set collapsing(value: BooleanLike) {
        this.isCollapsing = this.toBoolean(value);
        this.classes.set('collapsing', this.isCollapsing);
    }

    public constructor() {
        super();
        this.classes.register('celled', 'notCelled', 'very', BasicDirective.basic, 'unstackable', 'aligned', 'definition', 'collapsing')
            .registerFixed('table');
        this.aligned ??= 'middle';
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        TableComponent.defaults.invertedChange.pipe(takeUntil(this.destroy)).subscribe(value => this.refreshInverted(value));
    }
}
