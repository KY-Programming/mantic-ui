import { Directive, HostBinding, Input } from '@angular/core';
import { FlexAlignItems, FlexDirection, FlexJustifyContent } from './flex.types';
import { BooleanLike } from '../../models/boolean-like';
import { toBoolean } from '../../helpers/to-boolean';

@Directive({
    selector: '[m-flex]',
    standalone: true
})
export class FlexDirective {
    public static readonly default = { directive: FlexDirective, inputs: ['direction', 'alignItems', 'justifyContent'] };

    @HostBinding('style.display')
    protected display = 'flex';

    @Input()
    @HostBinding('style.flex-direction')
    public direction: FlexDirection | '' | undefined;

    @Input()
    public get 'm-flex'(): FlexDirection | '' | undefined {
        return this.direction;
    }

    public set 'm-flex'(value: FlexDirection | '' | undefined | null) {
        this.direction = value ?? '';
        this.display = value || value === '' ? 'flex' : '';
    }

    @Input()
    public get column(): boolean {
        return this.direction === 'column';
    }

    public set column(value: BooleanLike) {
        this.direction = toBoolean(value) ? 'column' : 'row';
    }

    @Input()
    public get row(): boolean {
        return this.direction === 'row';
    }

    public set row(value: BooleanLike) {
        this.direction = toBoolean(value) ? 'row' : 'column';
    }

    @Input()
    @HostBinding('style.align-items')
    public alignItems: FlexAlignItems | undefined;

    @Input()
    @HostBinding('style.justify-content')
    public justifyContent: FlexJustifyContent | undefined;
}
