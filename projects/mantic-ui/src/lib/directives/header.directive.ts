import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { BaseDirective } from '../base/base.directive';

@Directive({
    selector: '[m-header]'
})
// TODO: Implement
export class HeaderDirective extends BaseDirective {
    private isDividing: boolean;
    private isInverted: boolean;
    private isIcon: boolean;

    @HostBinding('class.ui')
    public readonly ui = true;

    public get dividing(): boolean | string {
        return this.isDividing;
    }

    @Input()
    @HostBinding('class.dividing')
    public set dividing(value: boolean | string) {
        this.isDividing = this.toBoolean(value);
    }

    public get inverted(): boolean {
        return this.isInverted;
    }

    @Input()
    @HostBinding('class.inverted')
    public set inverted(value: boolean | string) {
        this.isInverted = this.toBoolean(value);
    }

    public get icon(): boolean {
        return this.isIcon;
    }

    @Input()
    @HostBinding('class.icon')
    public set icon(value: boolean | string) {
        this.isIcon = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.sub')
    public sub: boolean;

    @HostBinding('class.header')
    public readonly header = true;

    // constructor(
    //     elementRef: ElementRef<HTMLElement>
    // ) {
    //     super(elementRef);
    // }

}
