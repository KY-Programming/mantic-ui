import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { FieldSize, fieldSizes } from '../models/field-size';
import { BaseComponent } from '../base/base.component';
import { ColorName } from '../models/color';

export declare type GridWidth = 'equals';

@Component({
    selector: 'm-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent extends BaseComponent {
    private columnsValue: FieldSize;
    private isVertically: boolean;
    private isDivided: boolean;
    private isCelled: boolean;
    private isInternally: boolean;
    private widthValue: GridWidth;

    @Input()
    @HostBinding('class.vertically')
    public get vertically(): boolean | string {
        return this.isVertically;
    }

    public set vertically(value: string | boolean) {
        this.isVertically = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.divided')
    public get divided(): boolean | string {
        return this.isDivided;
    }

    public set divided(value: string | boolean) {
        this.isDivided = this.toBoolean(value);
    }

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
        this.refreshClasses();
    }

    @Input()
    @HostBinding('class.internally')
    public get internally(): boolean | string {
        return this.isInternally;
    }

    public set internally(value: string | boolean) {
        this.isInternally = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.celled')
    public get celled(): boolean | string {
        return this.isCelled;
    }

    public set celled(value: string | boolean) {
        this.isCelled = this.toBoolean(value);
    }

    public get width(): GridWidth {
        return this.widthValue;
    }

    @Input()
    @HostBinding('class.width')
    public set width(value: GridWidth) {
        this.widthValue = value;
        this.classList.set('width', value);
        this.refreshClasses();
    }

    @HostBinding('class.grid')
    public readonly grid = true;

    constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList.register('vertically', 'divided', 'columns', 'internally', 'celled', 'equal', 'width');
    }

}
