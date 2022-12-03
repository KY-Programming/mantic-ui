import { Component, ContentChild, HostBinding, inject, Input } from '@angular/core';
import { AnimationDirection } from '../animation/animation-direction';
import { AnimationComponent } from '../animation/animation.component';
import { LabelComponent } from '../label/label.component';
import { ButtonBaseComponent } from '../../base/button-base.component';
import { BooleanLike } from '../../models/boolean-like';
import { IconType } from '../icon/icon-type';
import { IconSize } from '../icon/icon-size';
import { LabelPosition } from '../../models/label-position';
import { ColorDirective } from '../../directives/color.directive';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { BasicDirective } from '../../directives/basic.directive';

export declare type Pointing =
    'left'
    | 'right'
    | 'top'
    | 'bottom'
    | undefined;

@Component({
    selector: 'm-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IconComponent
    ],
    hostDirectives: [...ButtonBaseComponent.directives],
    providers: [...ButtonBaseComponent.providers]
})
export class ButtonComponent extends ButtonBaseComponent {
    private animatedField: AnimationComponent;
    private labelField: LabelComponent;
    private isFluid: boolean;
    private socialValue: string;
    private pointingValue: Pointing;
    private iconPositionValue: LabelPosition;
    private icoValue: IconType;
    protected readonly basicDirective = inject(BasicDirective, { self: true });
    protected readonly colorDirective = inject(ColorDirective, { self: true });

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
    public get icon(): IconType {
        return this.icoValue;
    }

    public set icon(value: IconType) {
        this.icoValue = value;
        this.classList.set('icon', !!value);
        this.classList.set('iconLabeled', value ? 'labeled' : undefined);
    }

    @Input()
    public iconSize: IconSize;

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

    public constructor() {
        super();
        this.classList.register('animation', 'animated', 'labelPosition', 'iconPosition', 'label', 'labeled', 'iconLabeled', 'fluid', 'social', 'icon');
    }
}
