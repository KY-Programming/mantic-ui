import { computed, Directive, input } from '@angular/core';
import { OverflowValue } from './overflow.types';

@Directive({
    selector: '[m-overflow]',
    host: {
        '[style.overflow-x]': 'effectiveOverflowX()',
        '[style.overflow-y]': 'effectiveOverflowY()',
    }
})
export class OverflowDirective {
    public static readonly default = {
        directive: OverflowDirective,
        inputs: ['m-overflow', 'm-overflow-x', 'm-overflow-y']
    };

    public readonly overflow = input<OverflowValue | '' | undefined>(undefined, { alias: 'm-overflow' });
    public readonly overflowX = input<OverflowValue | undefined>(undefined, { alias: 'm-overflow-x' });
    public readonly overflowY = input<OverflowValue | undefined>(undefined, { alias: 'm-overflow-y' });

    protected readonly effectiveOverflowX = computed(() => this.overflowX() || this.overflow() || undefined);
    protected readonly effectiveOverflowY = computed(() => this.overflowY() || this.overflow() || undefined);
}
