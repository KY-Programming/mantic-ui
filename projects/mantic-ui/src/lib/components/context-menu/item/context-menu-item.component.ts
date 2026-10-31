import { Component, effect, input } from '@angular/core';
import { toBoolean } from '../../../helpers/to-boolean';
import { BooleanLike } from '../../../models/boolean-like';
import { IconComponent } from '../../icon/icon.component';
import { IconType } from '../../icon/models/icon-type';
import { MenuItemComponent } from '../../menu-item/menu-item.component';
import { ContextMenuEvent } from '../models/context-menu-event';

@Component({
    selector: 'm-context-menu-item',
    templateUrl: './context-menu-item.component.html',
    styleUrls: ['./context-menu-item.component.scss'],
    imports: [IconComponent],
    providers: [...MenuItemComponent.providers],
    host: {
        '(click)': 'onClick($event)'
    }
})
export class ContextMenuItemComponent extends MenuItemComponent {
    public readonly icon = input<IconType>();
    public readonly iconColor = input<string>();
    public readonly keepOpen = input<boolean, BooleanLike>(false, { transform: toBoolean });

    public constructor() {
        super();
        this.classes.register('keepOpen');
        this.link.set(true);
        effect(() => this.classes.set('keepOpen', this.keepOpen()));
    }

    // The menu closes itself when the click bubbles up to it. Asking it via DI would miss items that are
    // re-projected through another component (e.g. app entries in m-chat's attach menu).
    protected onClick(event: ContextMenuEvent): void {
        if (this.keepOpen()) {
            event.keepContextMenuOpen = true;
        }
    }
}
