import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, contentChild, effect, input, signal } from '@angular/core';
import { ButtonBaseComponent } from '../../base/button-base.component';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { LabelPosition } from '../../models/label-position';
import { AnimationComponent } from '../animation/animation.component';
import { AnimationDirection } from '../animation/models/animation-direction';
import { IconComponent } from '../icon/icon.component';
import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';
import { LabelComponent } from '../label/label.component';

@Component({
    selector: 'm-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    imports: [IconComponent, NgTemplateOutlet, NgClass],
    providers: [...ButtonBaseComponent.providers]
})
export class ButtonComponent extends ButtonBaseComponent {
    public static readonly defaults = {
        inverted: signal(false)
    };
    public readonly animated = contentChild(AnimationComponent);
    public readonly animation = computed<AnimationDirection>(() => this.animated()?.direction());
    public readonly label = contentChild(LabelComponent);
    public readonly labelPosition = computed<LabelPosition>(() => this.label()?.position());
    public readonly icon = input<IconType>();
    public readonly iconSize = input<IconSize>();
    public readonly iconPosition = input<LabelPosition>();
    public readonly social = input<string>();
    public readonly fluid = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly pointing = input<boolean, BooleanLike>(false, { transform: toBoolean });

    public constructor() {
        super();
        this.classes.register('fluid', 'pointing', 'animation', 'animated', 'labelPosition', 'iconPosition', 'label', 'labeled', 'iconLabeled', 'social', 'icon');
        effect(() => this.classes.set('fluid', this.fluid()));
        effect(() => this.classes.set('pointing', this.pointing()));
        effect(() => {
            const value = this.icon();
            this.classes.set('icon', !!value);
            this.classes.set('iconLabeled', value ? 'labeled' : undefined);
        });
        effect(() => this.classes.set('iconPosition', this.iconPosition()));
        effect(() => this.classes.set('social', this.social()));
        effect(() => this.classes.set('labeled', !!this.label()));
        effect(() => this.refreshInverted(ButtonComponent.defaults.inverted()));
    }
}
