import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { ColorName } from '../models/color';

@Directive({
    selector: '[m-button]'
})
// TODO: Implement
export class ButtonDirective /*extends ButtonComponent*/ {

    @HostBinding('class.ui')
    @HostBinding('class.button')
    public readonly ui = true;

    @Input()
    @HostBinding('class')
    public color: ColorName;

    @Input()
    @HostBinding('class.icon')
    @HostBinding('class.labeled')
    @HostBinding('class')
    public icon: string;


    constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        // super(elementRef);
    }

}
