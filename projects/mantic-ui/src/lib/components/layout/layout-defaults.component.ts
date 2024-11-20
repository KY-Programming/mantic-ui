import { Component, Input, OnDestroy } from '@angular/core';
import { IconType } from '../icon/icon-type';
import { IconSize } from '../icon/icon-size';
import { LayoutComponent } from './layout.component';

@Component({
    selector: 'm-layout-defaults',
    template: '',
    })
export class LayoutDefaultsComponent implements OnDestroy {
    private readonly previousMenuIcon = LayoutComponent.defaults.menuIcon;
    private readonly previousMenuIconSize = LayoutComponent.defaults.menuIconSize;
    private currentMenuIcon?: IconType;
    private currentMenuIconSize?: IconSize;

    @Input()
    public set menuIcon(value: IconType) {
        this.currentMenuIcon = value;
        LayoutComponent.defaults.menuIcon = value;
    }

    @Input()
    public set menuIconSize(value: IconSize) {
        this.currentMenuIconSize = value;
        LayoutComponent.defaults.menuIconSize = value;
    }

    public ngOnDestroy(): void {
        if (this.currentMenuIcon === LayoutComponent.defaults.menuIcon) {
            LayoutComponent.defaults.menuIcon = this.previousMenuIcon;
        }
        if (this.currentMenuIconSize === LayoutComponent.defaults.menuIconSize) {
            LayoutComponent.defaults.menuIconSize = this.previousMenuIconSize;
        }
    }
}
