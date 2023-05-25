import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { BooleanLike } from '../../models/boolean-like';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InvertibleComponent } from '../../base/invertible.component';
import { BasicDirective } from '../../directives/basic.directive';

export declare type Align =
    | 'top'
    | 'bottom'
    | 'middle';

@Component({
    selector: 'm-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    standalone: true,
    hostDirectives: [...InvertibleComponent.directives, BasicDirective.default],
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
    @HostBinding('class.celled')
    public get celled(): boolean {
        return this.isCelled;
    }

    public set celled(value: BooleanLike) {
        this.isCelled = this.toBoolean(value);
    }

    @Input()
    public get notCelled(): boolean {
        return !this.celled;
    }

    public set notCelled(value: BooleanLike) {
        this.celled = !this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.very')
    public get very(): boolean {
        return this.isVery;
    }

    public set very(value: BooleanLike) {
        this.isVery = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.unstackable')
    public get unstackable(): boolean {
        return this.isUnstackable;
    }

    public set unstackable(value: BooleanLike) {
        this.isUnstackable = this.toBoolean(value);
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
    @HostBinding('class.definition')
    public get definition(): boolean {
        return this.isDefinition;
    }

    public set definition(value: BooleanLike) {
        this.isDefinition = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.collapsing')
    public get collapsing(): boolean {
        return this.isCollapsing;
    }

    public set collapsing(value: BooleanLike) {
        this.isCollapsing = this.toBoolean(value);
    }

    public constructor() {
        super();
        this.classes.register('celled', 'notCelled', 'very', 'unstackable', 'aligned', 'definition', 'collapsing')
            .registerFixed('table');
        this.aligned ??= 'middle';
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        TableComponent.defaults.invertedChange.pipe(takeUntil(this.destroy)).subscribe(value => this.refreshInverted(value));
    }
}
