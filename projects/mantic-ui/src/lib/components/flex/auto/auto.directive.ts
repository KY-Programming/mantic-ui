import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[m-auto]',
    standalone: true
})
export class AutoDirective {

    @HostBinding('style.flex')
    public readonly flex = '0 0 auto';

}
