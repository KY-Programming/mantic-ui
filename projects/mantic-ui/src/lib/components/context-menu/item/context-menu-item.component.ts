import { Component, HostListener, Input, Optional } from '@angular/core';
import { BooleanLike } from '../../../models/boolean-like';
import { IconType } from '../../icon/icon-type';
import { IconComponent } from '../../icon/icon.component';
import { MenuItemComponent } from '../../menu-item/menu-item.component';
import { ContextMenuComponent } from '../context-menu.component';

@Component({
    selector: 'm-context-menu-item',
    templateUrl: './context-menu-item.component.html',
    styleUrls: ['./context-menu-item.component.scss'],
    standalone: true,
    imports: [
        IconComponent
    ],
    providers: [...MenuItemComponent.providers]
})
export class ContextMenuItemComponent extends MenuItemComponent {
    private keepOpenValue = false;

    @Input()
    public icon: IconType | undefined;

    @Input()
    public iconColor: string | undefined;

    @Input()
    public get keepOpen(): boolean {
        return this.keepOpenValue;
    }

    public set keepOpen(value: BooleanLike) {
        this.keepOpenValue = this.toBoolean(value);
    }

    public constructor(
        @Optional() private readonly contextMenu: ContextMenuComponent
    ) {
        super();
        this.classes.register('keepOpen', 'icon');
        this.link = true;
    }

    @HostListener('click')
    private onClick(): void {
        if (this.keepOpen) {
            return;
        }
        this.contextMenu.close();
    }
}
