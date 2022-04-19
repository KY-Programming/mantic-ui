import { Component, ElementRef, Input } from '@angular/core';
import { FieldSize, fieldSizes } from '../models/field-size';
import { BaseComponent } from '../base/base.component';

export declare type GridWidth = 'equal';

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
    private noMarginValue: boolean;

    @Input()
    public get vertically(): boolean {
        return this.isVertically;
    }

    public set vertically(value: string | boolean) {
        this.isVertically = this.toBoolean(value);
        this.classList.set('vertically', this.isVertically);
    }

    @Input()
    public get divided(): boolean {
        return this.isDivided;
    }

    public set divided(value: string | boolean) {
        this.isDivided = this.toBoolean(value);
        this.classList.set('divided', this.isDivided);
    }

    public get columns(): FieldSize {
        return this.columnsValue;
    }

    @Input()
    public set columns(value: FieldSize) {
        const sizeNumber = value ? parseInt(value.toString(), 10) : undefined;
        if (sizeNumber && !Number.isNaN(sizeNumber)) {
            this.columnsValue = fieldSizes[sizeNumber];
        } else {
            this.columnsValue = value;
        }
        this.classList.set('columns', this.columnsValue ? `${this.columnsValue} column` : undefined);
    }

    @Input()
    public get internally(): boolean {
        return this.isInternally;
    }

    public set internally(value: string | boolean) {
        this.isInternally = this.toBoolean(value);
        this.classList.set('internally', this.isInternally);
    }

    @Input()
    public get celled(): boolean {
        return this.isCelled;
    }

    public set celled(value: string | boolean) {
        this.isCelled = this.toBoolean(value);
        this.classList.set('celled', this.isCelled);
    }

    public get width(): GridWidth {
        return this.widthValue;
    }

    @Input()
    public set width(value: GridWidth) {
        this.widthValue = value;
        this.classList.set('width', value ? `${value} width` : undefined);
    }

    @Input()
    public get noMargin(): boolean {
        return this.noMarginValue;
    }

    public set noMargin(value: string | boolean) {
        this.noMarginValue = this.toBoolean(value);
        this.classList.set('no-margin', this.noMargin);
    }

    public constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList.register('vertically', 'divided', 'columns', 'internally', 'celled', 'width', 'noMargin').registerFixed('grid');
    }

}
