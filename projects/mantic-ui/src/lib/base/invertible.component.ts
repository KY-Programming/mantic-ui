import { Directive, Inject, Input, Optional } from '@angular/core';
import { BooleanLike } from '../models/boolean-like';
import { BaseComponent } from './base.component';

@Directive()
export abstract class InvertibleComponent extends BaseComponent {
    private isInverted: boolean;
    private isInvertedChanged = false;

    @Input()
    public get inverted(): boolean {
        return this.isInverted;
    }

    public set inverted(value: BooleanLike) {
        this.isInvertedChanged = true;
        this.isInverted = this.toBoolean(value);
        this.classList.set('inverted', this.isInverted);
    }

    protected constructor(
        @Optional() @Inject('none') useUiClass = true
    ) {
        super(useUiClass);
        this.classList.register('inverted');
    }

    protected refreshInverted(value: boolean): void {
        if (this.isInvertedChanged) {
            return;
        }
        this.inverted = value;
        this.isInvertedChanged = false;
    }
}
