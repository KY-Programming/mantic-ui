import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { FieldSize, ParsableFieldSize, parseFieldSize } from '../../models/field-size';

export declare type CellFloat =
    'left'
    | 'right';

export declare type CellAlign =
    'left'
    | 'right';

@Component({
    selector: 'm-cell',
    templateUrl: './cell.component.html',
    styleUrls: ['./cell.component.scss'],
    providers: [...BaseComponent.providers]
})
export class CellComponent extends BaseComponent {
    private sizeValue?: FieldSize;
    private floatValue?: CellFloat;
    private alignValue?: CellAlign;

    public get size(): FieldSize | undefined {
        return this.sizeValue;
    }

    @Input()
    public set size(value: ParsableFieldSize | undefined) {
        this.sizeValue = parseFieldSize(value);
        this.classes.set('size', this.sizeValue);
        this.classes.set('wide', !!this.sizeValue);
    }

    @Input()
    public get float(): CellFloat | undefined {
        return this.floatValue;
    }

    public set float(value: CellFloat | undefined) {
        this.floatValue = value;
        this.classes.set('float', value ? `${value} floated` : undefined);
    }

    @Input()
    public get align(): CellAlign | undefined {
        return this.alignValue;
    }

    public set align(value: CellAlign | undefined) {
        this.alignValue = value;
        this.classes.set('align', value ? `${value} aligned` : undefined);
    }

    public constructor() {
        super(false);
        this.classes.register('size', 'wide', 'float', 'align')
            .registerFixed('column');
    }

}
