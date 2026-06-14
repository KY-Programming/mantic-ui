import { computed, Directive, effect, Inject, input, Optional, signal } from '@angular/core';
import { toBoolean } from '../helpers/to-boolean';
import { BooleanLike } from '../models/boolean-like';
import { BaseComponent } from './base.component';

@Directive()
export abstract class InvertibleComponent extends BaseComponent {
    protected static override readonly providers = [...BaseComponent.providers];
    private readonly invertedDefault = signal(false);
    public readonly invertedInput = input<boolean | undefined, BooleanLike>(undefined, { alias: 'inverted', transform: toBoolean });
    public readonly inverted = computed(() => this.invertedInput() ?? this.invertedDefault());

    protected constructor(
        // eslint-disable-next-line @angular-eslint/prefer-inject
        @Optional() @Inject('none') useUiClass = true
    ) {
        super(useUiClass);
        this.classes.register('inverted');
        effect(() => this.classes.set('inverted', this.inverted()));
    }

    protected refreshInverted(value: boolean): void {
        this.invertedDefault.set(value);
    }
}
