import { computed, Directive, input } from '@angular/core';
import { OverflowValue } from './overflow.types';

@Directive({
    selector: '[m-overflow]',
    host: {
        '[style.overflow]': 'overflow()',
        '[style.overflow-x]': 'overflowX()',
        '[style.overflow-y]': 'overflowY()',
    }
})
export class OverflowDirective {
    public static readonly default = {
        directive: OverflowDirective,
        inputs: ['m-overflow', 'm-overflow-x', 'm-overflow-y']
    };

    public readonly mOverflow = input<OverflowValue | '' | undefined>(undefined, { alias: 'm-overflow' });
    public readonly overflowX = input<OverflowValue | undefined>(undefined, { alias: 'm-overflow-x' });
    public readonly overflowY = input<OverflowValue | undefined>(undefined, { alias: 'm-overflow-y' });
    public readonly overflow = computed(() => this.mOverflow() || undefined);
}
