import { Component, HostBinding, Input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { BooleanLike } from '../../models/boolean-like';

@Component({
    selector: 'm-segment-group',
    templateUrl: './segment-group.component.html',
    styleUrls: ['./segment-group.component.scss'],
    standalone: true,
    hostDirectives: [...BaseComponent.directives],
    providers: [...BaseComponent.providers]
})
export class SegmentGroupComponent extends BaseComponent {
    private isHorizontal = false;

    @Input()
    @HostBinding('class.horizontal')
    public get horizontal(): boolean {
        return this.isHorizontal;
    }

    public set horizontal(value: BooleanLike) {
        this.isHorizontal = this.toBoolean(value);
    }

    public constructor() {
        super();
        this.classes.register('horizontal')
            .registerFixed('segments');
    }

}
