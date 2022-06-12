import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { FieldSize, fieldSizes } from '../models/field-size';
import { BaseComponent } from '../base/base.component';
import { BooleanLike } from '../models/boolean-like';

@Component({
    selector: 'm-row',
    templateUrl: './row.component.html',
    styleUrls: ['./row.component.scss']
})
export class RowComponent extends BaseComponent {
    private columnsValue: FieldSize;
    private isStretched: boolean;

    public get columns(): FieldSize {
        return this.columnsValue;
    }

    @Input()
    @HostBinding('class.column')
    public set columns(value: FieldSize) {
        const sizeNumber = value ? parseInt(value.toString()) : undefined;
        if (sizeNumber && !Number.isNaN(sizeNumber)) {
            this.columnsValue = fieldSizes[value];
        }
        else {
            this.columnsValue = value;
        }
        this.classList.set('columns', this.columnsValue);
    }

    @Input()
    @HostBinding('class.stretched')
    public get stretched(): boolean {
        return this.isStretched;
    }

    public set stretched(value: BooleanLike) {
        this.isStretched = this.toBoolean(value);
    }

    @HostBinding('class.row')
    public readonly row = true;

    public constructor() {
        super(false);
        this.classList.register('columns', 'stretched');
    }

}
