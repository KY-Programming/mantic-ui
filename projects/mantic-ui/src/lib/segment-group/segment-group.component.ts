import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'm-segment-group',
    templateUrl: './segment-group.component.html',
    styleUrls: ['./segment-group.component.scss']
})
export class SegmentGroupComponent extends BaseComponent {
    private isHorizontal: boolean;

    @Input()
    @HostBinding('class.horizontal')
    public get horizontal(): boolean | string {
        return this.isHorizontal;
    }

    public set horizontal(value: string | boolean) {
        this.isHorizontal = this.toBoolean(value);
    }

    @HostBinding('class.segments')
    public readonly segments = true;

    constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList
            .registerBoolean('horizontal');
    }

}
