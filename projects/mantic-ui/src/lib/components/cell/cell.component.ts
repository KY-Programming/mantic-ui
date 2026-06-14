import { Component, effect, input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { FieldSize, ParsableFieldSize, parseFieldSize } from '../../models/field-size';
import { CellAlign } from './models/cell-align';
import { CellFloat } from './models/cell-float';

@Component({
    selector: 'm-cell',
    templateUrl: './cell.component.html',
    styleUrls: ['./cell.component.scss'],
    providers: [...BaseComponent.providers]
})
export class CellComponent extends BaseComponent {
    public readonly size = input<FieldSize | undefined, ParsableFieldSize>(undefined, { transform: parseFieldSize });
    public readonly float = input<CellFloat | undefined>();
    public readonly align = input<CellAlign | undefined>();

    public constructor() {
        super(false);
        this.classes.register('size', 'wide', 'float', 'align')
            .registerFixed('column');
        effect(() => this.classes.set('size', this.size()));
        effect(() => this.classes.set('wide', !!this.size()));
        effect(() => this.classes.set('float', this.float() ? `${this.float() ?? ''} floated` : undefined));
        effect(() => this.classes.set('align', this.align() ? `${this.align() ?? ''} aligned` : undefined));
    }

}
