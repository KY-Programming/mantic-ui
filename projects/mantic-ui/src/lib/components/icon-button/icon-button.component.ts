import { Component, computed, effect, input } from '@angular/core';
import { ButtonBaseComponent } from '../../base/button-base.component';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';

@Component({
    selector: 'm-icon-button',
    templateUrl: './icon-button.component.html',
    styleUrls: ['./icon-button.component.scss'],
    imports: [IconComponent],
    providers: [...ButtonBaseComponent.providers]
})
export class IconButtonComponent extends ButtonBaseComponent {
    public readonly icon = input<IconType>();
    public readonly iconSize = input<IconSize>();
    public readonly social = input<string>();
    /** The themes name the brand classes and icons in lower case (`.ui.google.plus.button`, `google plus` icon) */
    protected readonly socialName = computed(() => this.social()?.toLowerCase());

    public constructor() {
        super();
        this.classes.register('social')
            .registerFixed('icon');
        effect(() => this.classes.set('social', this.socialName()));
        effect(() => this.refreshInverted(ButtonComponent.defaults.inverted()));
    }
}
