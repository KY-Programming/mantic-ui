import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[m-fill]',
    standalone: true
})
export class FillDirective {

    @HostBinding('style.flex')
    public readonly flex = '1';

}
