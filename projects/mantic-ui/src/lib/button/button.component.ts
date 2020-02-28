import { Component, ContentChild, ElementRef, Input } from '@angular/core';
import { AnimationDirection } from '../animation/animation-direction';
import { AnimationComponent } from '../animation/animation.component';
import { ButtonBase } from '../base/button-base';
import { LabelPosition } from '../label/label-position';
import { LabelComponent } from '../label/label.component';
import { Color } from '../models/color';

@Component({
  selector: 'm-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent extends ButtonBase {
  private animatedField: AnimationComponent;
  private labelField: LabelComponent;

  @ContentChild(AnimationComponent, { static: false })
  public set animated(value: AnimationComponent) {
    this.animatedField = value;
    this.refreshClasses();
  }
  public get animated(): AnimationComponent {
    return this.animatedField;
  }

  public get animation(): AnimationDirection {
    return this.animated ? this.animated.direction : undefined;
  }

  @ContentChild(LabelComponent, { static: false })
  public set label(value: LabelComponent) {
    this.labelField = value;
    this.refreshClasses();
  }
  public get label(): LabelComponent {
    return this.labelField;
  }

  public get labelPosition(): LabelPosition {
    return this.label ? this.label.position : undefined;
  }

  @Input()
  public pointing: 'left' | 'right' | 'top' | 'bottom' | undefined;

  @Input()
  public icon: string;

  @Input()
  public iconPosition: LabelPosition;

  @Input()
  public social: string;

  @Input()
  public fluid: boolean;

  public readonly Color = Color;

  public constructor(
    element: ElementRef<HTMLElement>
  ) {
    super(element);
    this.classList
      .register('animation')
      .registerBoolean('animated')
      .register('labelPosition')
      .register('iconPosition')
      .registerBoolean('label', 'labeled')
      .registerAction('icon', entry => entry.isActive = this.icon && !this.label, undefined, 'labeled icon')
      .registerBoolean('fluid')
      .registerAction('social', (entry, value) => entry.classes = value === undefined ? undefined : value.toString().toLowerCase());
  }
}
