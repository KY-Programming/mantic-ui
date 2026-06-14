import { Component, effect, inject, input } from '@angular/core';
import { toBoolean } from '../../../helpers/to-boolean';
import { BooleanLike } from '../../../models/boolean-like';
import { IconComponent } from '../../icon/icon.component';
import { IconType } from '../../icon/models/icon-type';
import { MenuItemComponent } from '../../menu-item/menu-item.component';
import { ContextMenuComponent } from '../context-menu.component';

@Component({
    selector: 'm-context-menu-item',
    templateUrl: './context-menu-item.component.html',
    styleUrls: ['./context-menu-item.component.scss'],
    imports: [IconComponent],
    providers: [...MenuItemComponent.providers],
    host: {
        '(click)': 'onClick()'
    }
})
export class ContextMenuItemComponent extends MenuItemComponent {
    private readonly contextMenu = inject(ContextMenuComponent, { optional: true });
    public readonly icon = input<IconType>();
    public readonly iconColor = input<string>();
    public readonly keepOpen = input<boolean, BooleanLike>(false, { transform: toBoolean });

    public constructor() {
        super();
        this.classes.register('keepOpen', 'icon');
        this.link.set(true);
        effect(() => this.classes.set('keepOpen', this.keepOpen()));
    }

    protected onClick(): void {
        if (this.keepOpen()) {
            return;
        }
        this.contextMenu?.close();
    }
}
