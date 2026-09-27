import { Component, computed, inject } from '@angular/core';
import { TabGroupComponent } from '../tab-group/tab-group.component';

// Adds its content to the menu of the tab group it is placed in, after the tabs (e.g. a settings item).
// A menu on top or at the bottom gets it at its right end
@Component({
    selector: 'm-tab-group-menu',
    templateUrl: './tab-group-menu.component.html',
    styleUrl: './tab-group-menu.component.scss',
    host: {
        'class': 'menu',
        '[class.right]': 'isRight()'
    }
})
export class TabGroupMenuComponent {
    private readonly tabGroup = inject(TabGroupComponent, { optional: true });
    protected readonly isRight = computed(() => {
        const menu = this.tabGroup?.menu() ?? 'top';
        return menu === 'top' || menu === 'bottom';
    });
}
