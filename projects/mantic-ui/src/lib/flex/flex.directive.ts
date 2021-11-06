import { Directive, HostBinding, Input } from '@angular/core';
import { FlexAlignItems, FlexDirection } from './flex.component';

@Directive({
    selector: '[m-flex]'
})
export class FlexDirective {

    @HostBinding('style.display')
    public readonly display = 'flex';

    @Input()
    @HostBinding('style.flex-direction')
    public 'm-flex': FlexDirection | '';

    @Input()
    @HostBinding('style.align-items')
    public alignItems: FlexAlignItems;
}
