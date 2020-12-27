import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[m-header]'
})
// TODO: Implement
export class HeaderDirective /*extends ElementBase*/ {

    @HostBinding('class.ui')
    public readonly ui = true;

    @Input()
    @HostBinding('class.dividing')
    public dividing: boolean;

    @Input()
    @HostBinding('class.inverted')
    public inverted: boolean;

    @Input()
    @HostBinding('class.icon')
    public icon: boolean;

    @HostBinding('class.header')
    public readonly header = true;

    constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        // super(elementRef);
    }

}
