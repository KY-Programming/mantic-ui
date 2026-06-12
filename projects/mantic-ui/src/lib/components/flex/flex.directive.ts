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

    @HostBinding('style.flex-direction')
    public readonly direction = input<FlexDirection | ''>();

    @Input()
    public get 'm-flex'(): FlexDirection | '' | undefined {
        return this.direction();
    }

    public set 'm-flex'(value: FlexDirection | '' | undefined | null) {
        this.direction = value ?? '';
        this.display = value || value === '' ? 'flex' : '';
    }

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    public get column(): boolean {
        return this.direction() === 'column';
    }

    public set column(value: BooleanLike) {
        this.direction = toBoolean(value) ? 'column' : 'row';
    }

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    public get row(): boolean {
        return this.direction() === 'row';
    }

    public set row(value: BooleanLike) {
        this.direction = toBoolean(value) ? 'row' : 'column';
    }

    @HostBinding('style.align-items')
public readonly alignItems = input<FlexAlignItems>();

    @HostBinding('style.justify-content')
public readonly justifyContent = input<FlexJustifyContent>();

    @HostBinding('style.gap')
public readonly gap = input<string>();

    public readonly wrap = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly wrapReverse = input<boolean, BooleanLike>(false, { transform: toBoolean });

    @HostBinding('style.flex-wrap')
    public get wrapStyle(): string {
        return this.wrap() ? 'wrap' : this.wrapReverse() ? 'wrap-reverse' : '';
    }
}
