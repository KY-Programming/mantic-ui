import { Component, effect, input, model } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { SidebarPosition } from './models/sidebar-position';
import { SidebarWidth } from './models/sidebar-width';

@Component({
    selector: 'm-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    providers: [...BaseComponent.providers],
    host: {
        '[class.no-scrolling]': 'noScrolling()'
    }
})
export class SidebarComponent extends BaseComponent {
    public readonly visible = model<boolean>(true);
    public readonly width = input<SidebarWidth>();
    public readonly position = input<SidebarPosition>('left');
    public readonly noScrolling = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly inverted = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly fluid = input<boolean, BooleanLike>(false, { transform: toBoolean });

    public constructor() {
        super();
        this.classes.register('inverted', 'fluid', 'width', 'position', 'visible', 'noScrolling')
            .registerFixed('sidebar');
        effect(() => this.classes.set('inverted', this.inverted()));
        effect(() => this.classes.set('fluid', this.fluid()));
        effect(() => this.classes.set('visible', this.visible()));
        effect(() => this.classes.set('width', this.width()));
        effect(() => this.classes.set('position', this.position()));
        this.refreshClasses();
    }

    public show(): void {
        this.visible.set(true);
    }

    public hide(): void {
        this.visible.set(false);
    }
}
