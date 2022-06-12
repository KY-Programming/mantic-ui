import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { BooleanLike } from '../models/boolean-like';

export declare type FlexDirection = 'row' | 'column';
export declare type FlexAlignItems = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
export declare type FlexJustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

@Component({
    selector: 'm-flex',
    templateUrl: './flex.component.html',
    styleUrls: ['./flex.component.scss']
})
export class FlexComponent extends BaseComponent {
    private isColumn: boolean;

    @Input()
    public get column(): boolean {
        return this.isColumn;
    }

    public set column(value: BooleanLike) {
        this.isColumn = this.toBoolean(value);
        this.direction = this.isColumn ? 'column' : undefined;
    }

    @Input()
    @HostBinding('style.flex-direction')
    public direction: FlexDirection;

    @Input()
    @HostBinding('style.align-items')
    public alignItems: FlexAlignItems;

    @Input()
    @HostBinding('style.justify-content')
    public justifyContent: FlexJustifyContent;

    public constructor() {
        super();
        this.classList.register('column', 'direction', 'alignItems', 'justifyContent');
    }

}
