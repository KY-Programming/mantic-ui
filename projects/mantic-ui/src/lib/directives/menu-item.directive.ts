import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[m-menu-item]'
})
// TODO: Implement
export class MenuItemDirective /*extends MenuItemComponent*/ {

    @Input()
    public active = false;

    constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        // super(elementRef);
        // this.classList
        //     .register('active')
        //     .registerFixed('item', Number.MAX_VALUE - 1);
    }
}
