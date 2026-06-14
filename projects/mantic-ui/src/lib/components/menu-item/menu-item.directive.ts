import { Directive, effect, input } from '@angular/core';
import { BaseDirective } from '../../base/base.directive';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';

@Directive({
    selector: '[m-menu-item]',
    providers: [...BaseDirective.providers]
})
// TODO: Implement
export class MenuItemDirective /*extends MenuItemComponent*/ extends BaseDirective {
    public readonly active = input<boolean, BooleanLike>(false, { transform: toBoolean });

    public constructor() {
        super();
        this.classes.register('active')
            .registerFixed('item');
        effect(() => this.classes.set('active', this.active()));
    }
}
