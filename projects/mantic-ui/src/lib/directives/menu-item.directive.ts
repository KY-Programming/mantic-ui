import { Directive } from '@angular/core';
import { BaseDirective } from '../base/base.directive';
import { ActiveDirective } from './active.directive';

@Directive({
    selector: '[m-menu-item]',
    standalone: true,
    hostDirectives: [...BaseDirective.directives, ActiveDirective.default],
    providers: [...BaseDirective.providers]
})
// TODO: Implement
export class MenuItemDirective /*extends MenuItemComponent*/ extends BaseDirective {

    public constructor() {
        super();
        this.classes.registerFixed('item');
    }
}
