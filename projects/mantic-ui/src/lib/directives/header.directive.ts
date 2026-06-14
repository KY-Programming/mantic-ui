import { Directive, effect, Input, input } from '@angular/core';
import { BaseDirective } from '../base/base.directive';
import { HeaderComponent } from '../components/header/header.component';
import { toBoolean } from '../helpers/to-boolean';
import { BooleanLike } from '../models/boolean-like';

@Directive({
    selector: '[m-header]',
    providers: [...BaseDirective.providers],
    host: {
        '[class.dividing]': 'dividing()',
        '[class.icon]': 'icon()',
        '[class.sub]': 'sub()'
    }
})
export class HeaderDirective extends BaseDirective {
    private isInverted: boolean | undefined;
    private isInvertedDefault = false;

    @Input()
    public get inverted(): boolean {
        return this.isInverted ?? this.isInvertedDefault;
    }

    public set inverted(value: BooleanLike) {
        this.isInverted = this.toBoolean(value);
        this.classes.set('inverted', this.inverted);
    }

    public readonly dividing = input<boolean, BooleanLike>(false, { transform: toBoolean });

    public readonly icon = input<boolean, BooleanLike>(false, { transform: toBoolean });

    public readonly sub = input(false);

    public constructor() {
        super();
        this.classes.register('inverted')
            .registerFixed('header');
        this.validateAttributes = false;
        effect(() => this.setInvertedDefault(HeaderComponent.defaults.inverted()));
    }

    private setInvertedDefault(value: boolean): void {
        this.isInvertedDefault = value;
        this.classes.set('inverted', this.inverted);
    }
}
