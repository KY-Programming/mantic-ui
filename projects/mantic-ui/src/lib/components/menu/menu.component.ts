import { Component, effect, inject, input } from '@angular/core';
import { InvertibleComponent } from '../../base/invertible.component';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { MenuPosition } from './models/menu-position';

@Component({
    selector: 'm-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    providers: [...InvertibleComponent.providers],
    host: {
        '[class.fixed]': 'fixed()',
        '[class.secondary]': 'secondary()',
        '[class.attached]': 'attached()',
        '[class.tabular]': 'tabular()',
        '[class.text]': 'text()',
        '[class.vertical]': 'vertical()'
    }
})
export class MenuComponent extends InvertibleComponent {
    public readonly element = this.elementRef;
    public readonly position = input<MenuPosition>();
    public readonly fixed = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly secondary = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly attached = input<MenuPosition>();
    public readonly tabular = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly text = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly vertical = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly pointing = input<boolean, BooleanLike>(false, { transform: toBoolean });

    public constructor() {
        super(!inject(MenuComponent, { optional: true, skipSelf: true }));
        this.classes.registerFixed('menu');
        this.classes.register('pointing', 'position', 'fixed', 'secondary', 'tabular', 'text', 'attached', 'vertical');
        effect(() => this.classes.set('pointing', this.pointing()));
        effect(() => this.classes.set('position', this.position()));
        effect(() => this.classes.set('attached', this.attached()));
    }
}
