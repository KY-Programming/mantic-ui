import { Component, ContentChild, ElementRef, HostBinding, Input } from '@angular/core';
import { AnimationDirection } from '../animation/animation-direction';
import { AnimationComponent } from '../animation/animation.component';
import { LabelPosition } from '../label/label-position';
import { LabelComponent } from '../label/label.component';
import { Color } from '../models/color';
import { ButtonBaseComponent } from '../base/button-base.component';
import { BooleanLike } from '../models/boolean-like';

export declare type Pointing =
    'left'
    | 'right'
    | 'top'
    | 'bottom'
    | undefined;

@Component({
    selector: 'm-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent extends ButtonBaseComponent {
    private animatedField: AnimationComponent;
    private labelField: LabelComponent;
    private isFluid: boolean;
    private socialValue: string;
    private pointingValue: Pointing;
    private iconValue: string;
    private iconPositionValue: LabelPosition;

    public get animated(): AnimationComponent {
        return this.animatedField;
    }

    @ContentChild(AnimationComponent)
    public set animated(value: AnimationComponent) {
        this.animatedField = value;
        this.refreshClasses();
    }

    public get animation(): AnimationDirection {
        return this.animated ? this.animated.direction : undefined;
    }

    @ContentChild(LabelComponent)
    public get label(): LabelComponent {
        return this.labelField;
    }

    public set label(value: LabelComponent) {
        this.labelField = value;
        this.classList.set('labeled', !!value);
        // this.refreshClasses();
    }

    public get labelPosition(): LabelPosition {
        return this.label ? this.label.position : undefined;
    }

    @Input()
    public get pointing(): Pointing {
        return this.pointingValue;
    }

    public set pointing(value: Pointing) {
        this.pointingValue = value;
        this.classList.set('pointing', value);
    }

    @Input()
    public get icon(): string {
        return this.iconValue;
    }

    public set icon(value: string) {
        this.iconValue = value;
        this.classList.set('icon', !!value);
        this.classList.set('iconLabeled', value ? 'labeled' : undefined);
    }

    @Input()
    public get iconPosition(): LabelPosition {
        return this.iconPositionValue;
    }

    public set iconPosition(value: LabelPosition) {
        this.iconPositionValue = value;
        this.classList.set('iconPosition', value);
    }

    @Input()
    public get social(): string {
        return this.socialValue;
    }

    public set social(value: string) {
        this.socialValue = value;
        this.classList.set('social', value);
    }

    @Input()
    @HostBinding('class.fluid')
    public get fluid(): boolean {
        return this.isFluid;
    }

    public set fluid(value: BooleanLike) {
        this.isFluid = this.toBoolean(value);
    }

    public readonly Color = Color;

    public constructor(
        element: ElementRef<HTMLElement>
    ) {
        super(element);
        this.classList.register('animation', 'animated', 'labelPosition', 'iconPosition', 'label', 'labeled', 'iconLabeled', 'fluid', 'social', 'icon');
    }
}
