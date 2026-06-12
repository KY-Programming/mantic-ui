import { NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, ChangeDetectionStrategy, input } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { FooterComponent } from '../footer/footer.component';
import { IconSize } from '../icon/icon-size';
import { IconType } from '../icon/icon-type';
import { IconComponent } from '../icon/icon.component';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
    selector: 'm-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MenuComponent, MenuItemComponent, IconComponent, FooterComponent, NgTemplateOutlet]
})
export class LayoutComponent {
    public static readonly defaults = { menuIcon: <IconType>'bars', menuIconSize: <IconSize>undefined };
    protected readonly defaults = LayoutComponent.defaults;

    public readonly showHamburger = input(false);

    public readonly menuIcon = input<IconType>();

    public readonly menuIconSize = input<IconSize>();

    public get menuTemplates(): TemplateRef<unknown>[] {
        return this.layoutService.menuTemplates;
    }

    public get footerTemplates(): TemplateRef<unknown>[] {
        return this.layoutService.footerTemplates;
    }

    public constructor(
        private readonly layoutService: LayoutService
    ) {
    }

}
