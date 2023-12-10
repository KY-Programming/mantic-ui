import { Directive, Inject, Input, Optional } from '@angular/core';
import { BooleanLike } from '../models/boolean-like';
import { BaseComponent } from './base.component';

@Directive({
    // TODO: Use InvertedDirective
    // hostDirectives: [InvertedDirective]
})
export abstract class InvertibleComponent extends BaseComponent {
    protected static override readonly providers = [...BaseComponent.providers];

    private isInverted = false;
    private isInvertedChanged = false;

    @Input()
    public get inverted(): boolean {
        return this.isInverted;
    }

    public set inverted(value: BooleanLike) {
        this.isInvertedChanged = true;
        this.isInverted = this.toBoolean(value);
        this.classes.set('inverted', this.isInverted);
    }

    protected constructor(
        @Optional() @Inject('none') useUiClass = true
    ) {
        super(useUiClass);
        this.classes.register('inverted');
    }

    protected refreshInverted(value: boolean): void {
        if (this.isInvertedChanged) {
            return;
        }
        this.inverted = value;
        this.isInvertedChanged = false;
    }
}
