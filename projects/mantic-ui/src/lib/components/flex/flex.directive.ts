import { Directive, HostBinding, input, Input } from '@angular/core';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { FlexAlignItems, FlexDirection, FlexJustifyContent } from './flex.types';

@Directive({
    selector: '[m-flex]'
})
export class FlexDirective {
    public static readonly default = { directive: FlexDirective, inputs: ['direction', 'alignItems', 'justifyContent', 'row', 'column', 'gap', 'wrap', 'wrapReverse'] };

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

    @Input()
    @HostBinding('style.gap')
    public gap: string | undefined;

    public readonly wrap = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly wrapReverse = input<boolean, BooleanLike>(false, { transform: toBoolean });

    @HostBinding('style.flex-wrap')
    public get wrapStyle(): string {
        return this.wrap() ? 'wrap' : this.wrapReverse() ? 'wrap-reverse' : '';
    }
}
