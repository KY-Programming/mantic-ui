import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[m-grow]',
    standalone: true
})
export class GrowDirective {

    @HostBinding('style.flex')
    public readonly flex = '1 0 auto';

}
