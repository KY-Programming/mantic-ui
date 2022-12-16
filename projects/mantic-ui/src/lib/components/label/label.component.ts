import { Component, HostBinding, Input } from '@angular/core';
import { LabelPosition } from '../../models/label-position';
import { BaseComponent } from '../../base/base.component';
import { LabelOptions } from '../../models/label-options';
import { BooleanLike } from '../../models/boolean-like';
import { ColorDirective } from '../../directives/color.directive';
import { BasicDirective } from '../../directives/basic.directive';

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
    hostDirectives: [...BaseComponent.directives, BasicDirective.default, ColorDirective.default],
    providers: [...BaseComponent.providers]
})
export class LabelComponent extends BaseComponent implements LabelOptions {
    private positionValue: LabelPosition;
    private pointingValue: LabelPointing;
    private isHorizontal: boolean;

    @Input()
    public get position(): LabelPosition {
        return this.positionValue;
    }

    public set position(value: LabelPosition) {
        this.positionValue = value;
        this.classes.set('position', value);
    }

    @Input()
    public get pointing(): LabelPointing {
        return this.pointingValue;
    }

    public set pointing(value: LabelPointing) {
        this.pointingValue = value;
        this.classes.set('pointing', value);
    }

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
        this.classes.register('pointing', 'position', 'horizontal')
            .registerFixed('label');
    }
}
