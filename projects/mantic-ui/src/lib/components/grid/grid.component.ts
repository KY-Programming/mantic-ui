import { Component, Input } from '@angular/core';
import { FieldSize, ParsableFieldSize, parseFieldSize } from '../../models/field-size';
import { BaseComponent } from '../../base/base.component';
import { BooleanLike } from '../../models/boolean-like';

export declare type GridWidth = 'equal';

@Component({
    selector: 'm-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
    standalone: true,
    hostDirectives: [...BaseComponent.directives],
    providers: [...BaseComponent.providers]
})
export class GridComponent extends BaseComponent {
    private columnsValue?: FieldSize;
    private isVertically = false;
    private isDivided = false;
    private isCelled = false;
    private isInternally = false;
    private widthValue?: GridWidth;
    private noMarginValue = false;

    @Input()
    public get vertically(): boolean {
        return this.isVertically;
    }

    public set vertically(value: BooleanLike) {
        this.isVertically = this.toBoolean(value);
        this.classes.set('vertically', this.isVertically);
    }

    @Input()
    public get divided(): boolean {
        return this.isDivided;
    }

    public set divided(value: BooleanLike) {
        this.isDivided = this.toBoolean(value);
        this.classes.set('divided', this.isDivided);
    }

    @Input()
    public get columns(): FieldSize | undefined {
        return this.columnsValue;
    }

    public set columns(value: ParsableFieldSize | undefined) {
        this.columnsValue = parseFieldSize(value);
        this.classes.set('columns', this.columnsValue ? `${this.columnsValue} column` : undefined);
    }

    @Input()
    public get internally(): boolean {
        return this.isInternally;
    }

    public set internally(value: BooleanLike) {
        this.isInternally = this.toBoolean(value);
        this.classes.set('internally', this.isInternally);
    }

    @Input()
    public get celled(): boolean {
        return this.isCelled;
    }

    public set celled(value: BooleanLike) {
        this.isCelled = this.toBoolean(value);
        this.classes.set('celled', this.isCelled);
    }

    @Input()
    public get width(): GridWidth | undefined {
        return this.widthValue;
    }

    public set width(value: GridWidth | undefined) {
        this.widthValue = value;
        this.classes.set('width', value ? `${value} width` : undefined);
    }

    @Input()
    public get noMargin(): boolean {
        return this.noMarginValue;
    }

    public set noMargin(value: BooleanLike) {
        this.noMarginValue = this.toBoolean(value);
        this.classes.set('no-margin', this.noMargin);
    }

    public constructor() {
        super();
        this.classes.register('vertically', 'divided', 'columns', 'internally', 'celled', 'width', 'noMargin')
            .registerFixed('grid');
    }

}
