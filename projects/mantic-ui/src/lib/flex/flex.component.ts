import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

export declare type FlexDirection = 'row' | 'column';
export declare type FlexAlignItems = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';

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

    public set column(value: string | boolean) {
        this.isColumn = this.toBoolean(value);
        this.direction = this.isColumn ? 'column' : undefined;
    }

    @Input()
    @HostBinding('style.flex-direction')
    public direction: FlexDirection;

    @Input()
    @HostBinding('style.align-items')
    public alignItems: FlexAlignItems;

    public constructor(
      elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList.register('column', 'direction', 'alignItems');
    }

}
