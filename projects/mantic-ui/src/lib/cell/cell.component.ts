import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { FieldSize, fieldSizes } from '../models/field-size';
import { BaseComponent } from '../base/base.component';

export declare type CellFloat =
    'left'
    | 'right';

export declare type CellAlign =
    'left'
    | 'right';

@Component({
    selector: 'm-cell',
    templateUrl: './cell.component.html',
    styleUrls: ['./cell.component.scss']
})
export class CellComponent extends BaseComponent {
    private sizeValue: FieldSize;
    private floatValue: CellFloat;
    private alignValue: CellAlign;

    public get size(): FieldSize {
        return this.sizeValue;
    }

    @Input()
    @HostBinding('class.wide')
    public set size(value: FieldSize) {
        const sizeNumber = value ? parseInt(value.toString()) : undefined;
        if (sizeNumber && !Number.isNaN(sizeNumber)) {
            this.sizeValue = fieldSizes[value];
        }
        else {
            this.sizeValue = value;
        }
        this.classList.set('size', this.sizeValue);
    }

    @Input()
    public get float(): CellFloat {
        return this.floatValue;
    }

    public set float(value: CellFloat) {
        this.floatValue = value;
        this.classList.set('float', value ? `${value} floated` : undefined);
    }

    @Input()
    public get align(): CellAlign {
        return this.alignValue;
    }

    public set align(value: CellAlign) {
        this.alignValue = value;
        this.classList.set('align', value ? `${value} aligned` : undefined);
    }

    @HostBinding('class.column')
    public readonly column = true;

    constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef, false);
        this.classList.register('size', 'float');
    }

}
