import { Directive, ElementRef, Input } from '@angular/core';
import { BaseDirective } from '../base/base.directive';
import { BooleanLike } from '../models/boolean-like';

@Directive({
    selector: '[m-menu-item]'
})
// TODO: Implement
export class MenuItemDirective /*extends MenuItemComponent*/ extends BaseDirective {
    private isActive: boolean;

    @Input()
    public get active(): boolean {
        return this.isActive;
    }

    public set active(value: BooleanLike) {
        this.isActive = this.toBoolean(value);
        this.classList.set('active', this.isActive);
    }


    public constructor() {
        super();
        this.classList
            .register('active')
            .registerFixed('item');
    }
}
