import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[m-shrink]',
    standalone: true
})
export class ShrinkDirective {

    @HostBinding('style.flex')
    protected readonly flex = '0 1 auto';

}
