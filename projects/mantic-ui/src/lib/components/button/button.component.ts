import { Component, ContentChild, inject, Input } from '@angular/core';
import { AnimationDirection } from '../animation/animation-direction';
import { AnimationComponent } from '../animation/animation.component';
import { LabelComponent } from '../label/label.component';
import { ButtonBaseComponent } from '../../base/button-base.component';
import { IconType } from '../icon/icon-type';
import { IconSize } from '../icon/icon-size';
import { LabelPosition } from '../../models/label-position';
import { ColorDirective } from '../../directives/color.directive';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { BasicDirective } from '../../directives/basic.directive';
import { FluidDirective } from '../../directives/fluid.directive';
import { ColorName } from '../../models/color';
import { PointingDirective } from '../../directives/pointing.directive';

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
    hostDirectives: [...ButtonBaseComponent.directives, FluidDirective.default, PointingDirective.default],
    providers: [...ButtonBaseComponent.providers]
})
export class ButtonComponent extends ButtonBaseComponent {
    private readonly basicDirective = inject(BasicDirective, { self: true });
    private readonly colorDirective = inject(ColorDirective, { self: true });
    private animatedField: AnimationComponent;
    private labelField: LabelComponent;
    private socialValue: string;
    private iconPositionValue: LabelPosition;
    private icoValue: IconType;

    protected get basic(): boolean {
        return this.basicDirective.basic;
    }

    protected get color(): ColorName {
        return this.colorDirective.color;
    }

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
        this.classes.set('labeled', !!value);
    }

    public get labelPosition(): LabelPosition {
        return this.label ? this.label.position : undefined;
    }

    @Input()
    public get icon(): IconType {
        return this.icoValue;
    }

    public set icon(value: IconType) {
        this.icoValue = value;
        this.classes.set('icon', !!value);
        this.classes.set('iconLabeled', value ? 'labeled' : undefined);
    }

    @Input()
    public iconSize: IconSize;

    @Input()
    public get iconPosition(): LabelPosition {
        return this.iconPositionValue;
    }

    public set iconPosition(value: LabelPosition) {
        this.iconPositionValue = value;
        this.classes.set('iconPosition', value);
    }

    @Input()
    public get social(): string {
        return this.socialValue;
    }

    public set social(value: string) {
        this.socialValue = value;
        this.classes.set('social', value);
    }

    public constructor() {
        super();
        this.classes.register('animation', 'animated', 'labelPosition', 'iconPosition', 'label', 'labeled', 'iconLabeled', 'social', 'icon');
    }
}
