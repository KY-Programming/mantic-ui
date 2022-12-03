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
    hostDirectives: [
        BasicDirective.default,
        ColorDirective.default
    ],
    providers: [...BaseComponent.providers]
})
export class LabelComponent extends BaseComponent implements LabelOptions {
    private positionValue: LabelPosition;
    private pointingValue: LabelPointing;
    private isHorizontal: boolean;

    public get position(): LabelPosition {
        return this.positionValue;
    }

    @Input()
    public set position(value: LabelPosition) {
        this.positionValue = value;
        this.classList.set('position', value);
    }

    public get pointing(): LabelPointing {
        return this.pointingValue;
    }

    @Input()
    public set pointing(value: LabelPointing) {
        this.pointingValue = value;
        this.classList.set('color', value);
    }

    public get horizontal(): boolean {
        return this.isHorizontal;
    }

    @Input()
    @HostBinding('class.horizontal')
    public set horizontal(value: BooleanLike) {
        this.isHorizontal = this.toBoolean(value);
    }

    @HostBinding('class.label')
    public readonly label = true;

    public constructor() {
        super();
        this.classList.register('pointing', 'pointing', 'color', 'basic', 'horizontal');
    }
}
