import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { BooleanLike } from '../models/boolean-like';

@Component({
    selector: 'm-segment-group',
    templateUrl: './segment-group.component.html',
    styleUrls: ['./segment-group.component.scss']
})
export class SegmentGroupComponent extends BaseComponent {
    private isHorizontal: boolean;

    @Input()
    @HostBinding('class.horizontal')
    public get horizontal(): boolean {
        return this.isHorizontal;
    }

    public set horizontal(value: BooleanLike) {
        this.isHorizontal = this.toBoolean(value);
    }

    @HostBinding('class.segments')
    public readonly segments = true;

    public constructor() {
        super();
        this.classList.register('horizontal');
    }

}
