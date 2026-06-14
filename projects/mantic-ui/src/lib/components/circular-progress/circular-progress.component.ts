import { Component, computed, input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { ColorName } from '../../models/color';

@Component({
    selector: 'm-circular-progress',
    templateUrl: './circular-progress.component.html',
    styleUrls: ['./circular-progress.component.scss'],
    providers: [...BaseComponent.providers],
    host: {
        '[class.success]': 'success()',
        '[class.error]': 'error()',
        '[class.warning]': 'warning()',
        '[class]': 'color()'
    }
})
export class CircularProgressComponent extends BaseComponent {
    public readonly value = input.required<number>();
    public readonly min = input(0);
    public readonly max = input(100);
    public readonly size = input(160);
    public readonly strokeWidth = input(12);
    public readonly centerContent = input(true);
    public readonly success = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly error = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly warning = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly color = input<ColorName | undefined>(undefined);
    protected readonly radius = computed(() => this.size() / 2 - this.strokeWidth() / 2);
    protected readonly total = computed(() => 2 * Math.PI * this.radius());
    protected readonly offset = computed(() => {
        const valueOffset = (this.value() - this.min()) / (this.max() - this.min());
        return this.total() * (1 - valueOffset);
    });

    public constructor() {
        super();
        this.classes.register('success', 'error', 'warning')
            .registerFixed('circular', 'progress');
    }

}
