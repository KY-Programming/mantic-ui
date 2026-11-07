import { Component, effect, input, OnDestroy } from '@angular/core';
import { ContextMenuComponent } from './context-menu.component';
import { ContextMenuPosition } from './models/context-menu-position';

/** Sets app-wide defaults for every `m-context-menu` while it is in the page; the previous values come back when it leaves. */
@Component({
    selector: 'm-context-menu-defaults',
    template: ''
})
export class ContextMenuDefaultsComponent implements OnDestroy {
    private readonly previousInverted = ContextMenuComponent.defaults.inverted();
    private currentInverted?: boolean;
    /** Dark menus, e.g. while the page is in dark mode; a menu's own `inverted` wins. */
    public readonly inverted = input<boolean>();
    private readonly previousPosition = ContextMenuComponent.defaults.position();
    private currentPosition?: ContextMenuPosition;
    /** How menus place themselves (see `ContextMenuPosition`); a menu's own `position` wins. */
    public readonly position = input<ContextMenuPosition>();

    public constructor() {
        effect(() => {
            const value = this.inverted();
            if (value !== undefined) {
                this.currentInverted = value;
                ContextMenuComponent.defaults.inverted.set(value);
            }
        });
        effect(() => {
            const value = this.position();
            if (value !== undefined) {
                this.currentPosition = value;
                ContextMenuComponent.defaults.position.set(value);
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.currentInverted === ContextMenuComponent.defaults.inverted()) {
            ContextMenuComponent.defaults.inverted.set(this.previousInverted);
        }
        if (this.currentPosition === ContextMenuComponent.defaults.position()) {
            ContextMenuComponent.defaults.position.set(this.previousPosition);
        }
    }
}
