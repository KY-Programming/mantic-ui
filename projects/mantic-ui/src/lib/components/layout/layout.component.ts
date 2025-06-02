import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
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
    imports: [MenuComponent, MenuItemComponent, IconComponent, FooterComponent, NgTemplateOutlet]
})
export class LayoutComponent {
    public static readonly defaults = { menuIcon: <IconType>'bars', menuIconSize: <IconSize>undefined };
    protected readonly defaults = LayoutComponent.defaults;

    @Input()
    public showHamburger = false;

    @Input()
    public menuIcon: IconType | undefined;

    @Input()
    public menuIconSize: IconSize;

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
