import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { BooleanLike } from '../models/boolean-like';

export declare type Align =
    | 'top'
    | 'bottom'
    | 'middle';

@Component({
    selector: 'm-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent extends BaseComponent {
    private isCelled = true;
    private isUnstackable: boolean;
    private isBasic: boolean;
    private isVery: boolean;
    private alignedValue: Align;
    private isDefinition: boolean;

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
    @HostBinding('class.basic')
    public get basic(): boolean {
        return this.isBasic;
    }

    public set basic(value: BooleanLike) {
        this.isBasic = this.toBoolean(value);
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
    public get aligned(): Align {
        return this.alignedValue;
    }

    public set aligned(value: Align) {
        this.alignedValue = value;
        this.classList.set('aligned', value ? value + ' aligned' : undefined);
    }

    @Input()
    @HostBinding('class.definition')
    public get definition(): boolean {
        return this.isDefinition;
    }

    public set definition(value: BooleanLike) {
        this.isDefinition = this.toBoolean(value);
    }

    public constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList.register('celled', 'notCelled', 'very', 'basic', 'unstackable', 'aligned', 'definition').registerFixed('table');
        this.aligned ??= 'middle';
    }

}
