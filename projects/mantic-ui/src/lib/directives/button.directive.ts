import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
    selector: '[m-button]'
})
// TODO: Implement
export class ButtonDirective /*extends ButtonComponent*/ {

    @HostBinding('class.ui')
    @HostBinding('class.button')
    public readonly ui = true

    constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        // super(elementRef);
    }

}
