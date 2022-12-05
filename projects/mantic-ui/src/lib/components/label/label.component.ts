import { Component, HostBinding, Input } from '@angular/core';
import { LabelPosition } from '../../models/label-position';
import { BaseComponent } from '../../base/base.component';
import { LabelOptions } from '../../models/label-options';
import { BooleanLike } from '../../models/boolean-like';
import { ColorDirective } from '../../directives/color.directive';
import { BasicDirective } from '../../directives/basic.directive';
import { PointingDirective } from '../../directives/pointing.directive';

export declare type LabelPointing =
    'left'
    | 'right'
    | 'top'
    | 'bottom'
    | undefined;

@Component({
    selector: 'm-label',
    templateUrl: './label.component.html',
    styleUrls: ['./label.component.scss'],
    standalone: true,
    hostDirectives: [...BaseComponent.directives, BasicDirective.default, ColorDirective.default, PointingDirective],
    providers: [...BaseComponent.providers]
})
export class LabelComponent extends BaseComponent implements LabelOptions {
    private positionValue: LabelPosition;
    private isHorizontal: boolean;

    public get position(): LabelPosition {
        return this.positionValue;
    }

    @Input()
    public set position(value: LabelPosition) {
        this.positionValue = value;
        this.classes.set('position', value);
    }

    public get horizontal(): boolean {
        return this.isHorizontal;
    }

    @Input()
    @HostBinding('class.horizontal')
    public set horizontal(value: BooleanLike) {
        this.isHorizontal = this.toBoolean(value);
    }

    public constructor() {
        super();
        this.classes.register('position', 'horizontal')
            .registerFixed('label');
    }
}
