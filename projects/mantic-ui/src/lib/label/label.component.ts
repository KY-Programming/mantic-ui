import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { LabelPosition } from './label-position';
import { BaseComponent } from '../base/base.component';
import { ColorName } from '../models/color';

export declare type LabelPointing =
    'left'
    | 'right'
    | 'top'
    | 'bottom'
    | undefined;

@Component({
    selector: 'm-label',
    templateUrl: './label.component.html',
    styleUrls: ['./label.component.scss']
})
export class LabelComponent extends BaseComponent {
    private positionValue: LabelPosition;
    private pointingValue: LabelPointing;
    private isBasic: boolean;
    private colorValue: ColorName;
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

    public get basic(): boolean | string {
        return this.isBasic;
    }

    @Input()
    @HostBinding('class.basic')
    public set basic(value: boolean | string) {
        this.isBasic = this.toBoolean(value);
    }

    public get color(): ColorName {
        return this.colorValue;
    }

    @Input()
    public set color(value: ColorName) {
        this.colorValue = value;
        this.classList.set('color', value);
    }

    public get horizontal(): boolean | string {
        return this.isHorizontal;
    }

    @Input()
    @HostBinding('class.horizontal')
    public set horizontal(value: boolean | string) {
        this.isHorizontal = this.toBoolean(value);
    }

    @HostBinding('class.label')
    public readonly label = true;

    public constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList.register('pointing', 'pointing', 'color', 'basic', 'horizontal');
    }
}
