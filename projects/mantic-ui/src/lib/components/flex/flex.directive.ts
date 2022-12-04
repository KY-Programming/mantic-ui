import { Directive, HostBinding, Input } from '@angular/core';
import { FlexAlignItems, FlexDirection, FlexJustifyContent } from './flex.types';

@Directive({
    selector: '[m-flex]',
    standalone: true
})
export class FlexDirective {
    public static readonly default = { directive: FlexDirective, inputs: ['direction', 'alignItems', 'justifyContent'] };

    @HostBinding('style.display')
    protected display = 'flex';

    @Input()
    @HostBinding('style.flex-direction')
    public direction: FlexDirection | '';

    @Input()
    public get 'm-flex'(): FlexDirection | '' {
        return this.direction;
    }

    public set 'm-flex'(value: FlexDirection | '' | undefined | null) {
        this.direction = value ?? '';
        this.display = value || value === '' ? 'flex' : '';
    }

    @Input()
    @HostBinding('style.align-items')
    public alignItems: FlexAlignItems;

    @Input()
    @HostBinding('style.justify-content')
    public justifyContent: FlexJustifyContent;
}
