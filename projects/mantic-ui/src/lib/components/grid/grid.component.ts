import { Component, effect, input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { FieldSize, ParsableFieldSize, parseFieldSize } from '../../models/field-size';
import { GridWidth } from './models/grid-width';

@Component({
    selector: 'm-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
    providers: [...BaseComponent.providers]
})
export class GridComponent extends BaseComponent {
    public readonly vertically = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly divided = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly columns = input<FieldSize | undefined, ParsableFieldSize>(undefined, { transform: parseFieldSize });
    public readonly internally = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly celled = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly width = input<GridWidth | undefined>();
    public readonly noMargin = input<boolean, BooleanLike>(false, { transform: toBoolean });

    public constructor() {
        super();
        this.classes.register('vertically', 'divided', 'columns', 'internally', 'celled', 'width', 'noMargin')
            .registerFixed('grid');
        effect(() => this.classes.set('vertically', this.vertically()));
        effect(() => this.classes.set('divided', this.divided()));
        effect(() => this.classes.set('columns', this.columns() ? `${this.columns() ?? 'none'} column` : undefined));
        effect(() => this.classes.set('internally', this.internally()));
        effect(() => this.classes.set('celled', this.celled()));
        effect(() => this.classes.set('width', this.width() ? `${this.width() ?? 'none'} width` : undefined));
        effect(() => this.classes.set('no-margin', this.noMargin()));
    }

}
