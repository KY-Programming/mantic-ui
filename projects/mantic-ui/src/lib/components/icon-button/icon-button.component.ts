import { Component, effect, input } from '@angular/core';
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
    providers: [...ButtonBaseComponent.providers],
    host: {
        '[class.social]': 'social()'
    }
})
export class IconButtonComponent extends ButtonBaseComponent {
    public readonly icon = input<IconType>();
    public readonly iconSize = input<IconSize>();
    public readonly social = input<string>();

    public constructor() {
        super();
        this.classes.register('iconSize', 'social', 'title')
            .registerFixed('icon');
        effect(() => this.refreshInverted(ButtonComponent.defaults.inverted()));
    }
}
