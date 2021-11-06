import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

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
    public get celled(): boolean | string {
        return this.isCelled;
    }

    public set celled(value: string | boolean) {
        this.isCelled = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.very')
    public get very(): boolean | string {
        return this.isVery;
    }

    public set very(value: string | boolean) {
        this.isVery = this.toBoolean(value);
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
    @HostBinding('class.unstackable')
    public get unstackable(): boolean | string {
        return this.isUnstackable;
    }

    public set unstackable(value: string | boolean) {
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
    public get definition(): boolean | string {
        return this.isDefinition;
    }

    public set definition(value: string | boolean) {
        this.isDefinition = this.toBoolean(value);
    }

    constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList.register('celled', 'very', 'basic', 'unstackable', 'aligned', 'definition').registerFixed('table', 'test');
        this.aligned ??= 'middle';
    }

}
