import { Directive, HostBinding, Input } from '@angular/core';
import { BaseDirective } from '../base/base.directive';
import { BooleanLike } from '../models/boolean-like';
import { InvertedDirective } from './inverted.directive';

@Directive({
    selector: '[m-header]',
    standalone: true,
    hostDirectives: [...BaseDirective.directives, InvertedDirective.default],
    providers: [...BaseDirective.providers]
})
// TODO: Implement
export class HeaderDirective extends BaseDirective {
    private isDividing: boolean;
    private isIcon: boolean;

    public get dividing(): boolean {
        return this.isDividing;
    }

    @Input()
    @HostBinding('class.dividing')
    public set dividing(value: BooleanLike) {
        this.isDividing = this.toBoolean(value);
    }

    public get icon(): boolean {
        return this.isIcon;
    }

    @Input()
    @HostBinding('class.icon')
    public set icon(value: BooleanLike) {
        this.isIcon = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.sub')
    public sub: boolean;

    public constructor() {
        super();
        this.classes.registerFixed('header');
        this.validateAttributes = false;
    }

}
