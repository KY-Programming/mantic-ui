import { computed, Directive, input } from '@angular/core';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { FlexAlignItems, FlexDirection, FlexJustifyContent } from './flex.types';

@Directive({
    selector: '[m-flex]',
    host: {
        '[style.display]': 'display',
        '[style.flex-direction]': 'direction()',
        '[style.align-items]': 'alignItems()',
        '[style.justify-content]': 'justifyContent()',
        '[style.gap]': 'gap()',
        '[style.flex-wrap]': 'wrapStyle()'
    }
})
export class FlexDirective {
    public static readonly default = { directive: FlexDirective, inputs: ['alignItems', 'justifyContent', 'column', 'reverse', 'gap', 'wrap', 'wrapReverse'] };
    protected readonly display = 'flex';
    public readonly column = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly reverse = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly alignItems = input<FlexAlignItems>();
    public readonly justifyContent = input<FlexJustifyContent>();
    public readonly gap = input<string>();
    public readonly wrap = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly wrapReverse = input<boolean, BooleanLike>(false, { transform: toBoolean });
    protected readonly wrapStyle = computed(() => this.wrap() ? 'wrap' : this.wrapReverse() ? 'wrap-reverse' : '');
    public readonly direction = computed<FlexDirection>(() => {
        const column = this.column();
        // eslint-disable-next-line unicorn/no-array-reverse
        if (this.reverse()) {
            return column ? 'column-reverse' : 'row-reverse';
        }
        return column ? 'column' : 'row';
    });
}
