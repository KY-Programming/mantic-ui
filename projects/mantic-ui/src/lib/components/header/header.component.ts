import { Component, effect, input, signal } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { InvertibleComponent } from '../../base/invertible.component';
import { IconComponent } from '../icon/icon.component';
import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';
import { HeaderSize } from './models/header-size';

@Component({
    selector: 'm-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [IconComponent],
    providers: [...BaseComponent.providers]
})
export class HeaderComponent extends InvertibleComponent {
    public static readonly defaults = {
        inverted: signal(false)
    };
    public readonly icon = input<IconType>();
    public readonly iconSize = input<IconSize>();
    public readonly size = input<HeaderSize>();

    public constructor() {
        super();
        this.classes.register('size', 'iconSize')
            .registerFixed('header');
        effect(() => this.classes.set('size', this.size()));
        effect(() => this.refreshInverted(HeaderComponent.defaults.inverted()));
    }
}
