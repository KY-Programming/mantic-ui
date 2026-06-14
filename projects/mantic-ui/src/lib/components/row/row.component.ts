import { Component, effect, input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { FieldSize, ParsableFieldSize, parseFieldSize } from '../../models/field-size';

@Component({
    selector: 'm-row',
    templateUrl: './row.component.html',
    styleUrls: ['./row.component.scss'],
    providers: [...BaseComponent.providers],
    host: {
        '[class.stretched]': 'stretched()'
    }
})
export class RowComponent extends BaseComponent {
    public readonly columns = input<FieldSize | undefined, ParsableFieldSize>(undefined, { transform: parseFieldSize });
    public readonly stretched = input<boolean, BooleanLike>(false, { transform: toBoolean });

    public constructor() {
        super(false);
        this.classes.register('columns', 'column', 'stretched')
            .registerFixed('row');
        effect(() => {
            const columns = this.columns();
            this.classes.set('columns', columns);
            this.classes.set('column', !!columns);
        });
    }

}
