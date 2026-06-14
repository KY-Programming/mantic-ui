import { Component, effect, input, OnDestroy } from '@angular/core';
import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';
import { LayoutComponent } from './layout.component';

@Component({
    selector: 'm-layout-defaults',
    template: ''
})
export class LayoutDefaultsComponent implements OnDestroy {
    private readonly previousMenuIcon = LayoutComponent.defaults.menuIcon();
    private readonly previousMenuIconSize = LayoutComponent.defaults.menuIconSize();
    private currentMenuIcon?: IconType;
    private currentMenuIconSize?: IconSize;
    public readonly menuIcon = input<IconType>();
    public readonly menuIconSize = input<IconSize>();

    public constructor() {
        effect(() => {
            const value = this.menuIcon();
            if (value !== undefined) {
                this.currentMenuIcon = value;
                LayoutComponent.defaults.menuIcon.set(value);
            }
        });
        effect(() => {
            const value = this.menuIconSize();
            if (value !== undefined) {
                this.currentMenuIconSize = value;
                LayoutComponent.defaults.menuIconSize.set(value);
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.currentMenuIcon === LayoutComponent.defaults.menuIcon()) {
            LayoutComponent.defaults.menuIcon.set(this.previousMenuIcon);
        }
        if (this.currentMenuIconSize === LayoutComponent.defaults.menuIconSize()) {
            LayoutComponent.defaults.menuIconSize.set(this.previousMenuIconSize);
        }
    }
}
