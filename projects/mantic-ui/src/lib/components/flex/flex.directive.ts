import { Directive, HostBinding, Input } from '@angular/core';
import { FlexAlignItems, FlexDirection } from './flex.component';

@Directive({
    selector: '[m-flex]'
})
export class FlexDirective {

    @HostBinding('style.display')
    protected display: string;

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
}
