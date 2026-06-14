import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { FooterComponent } from '../footer/footer.component';
import { IconComponent } from '../icon/icon.component';
import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
    selector: 'm-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    imports: [MenuComponent, MenuItemComponent, IconComponent, FooterComponent, NgTemplateOutlet]
})
export class LayoutComponent {
    public static readonly defaults = { menuIcon: signal<IconType>('bars'), menuIconSize: signal<IconSize>(undefined) };
    protected readonly defaults = LayoutComponent.defaults;
    protected readonly layoutService = inject(LayoutService);
    public readonly showHamburger = input(false);
    public readonly menuIcon = input<IconType>();
    public readonly menuIconSize = input<IconSize>();
}
