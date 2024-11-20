import { Directive, inject, Input } from '@angular/core';
import { toBoolean } from '../helpers/to-boolean';
import { BooleanLike } from '../models/boolean-like';
import { SortedClassesService } from '../services/sorted-classes.service';

@Directive({
    selector: '[-m-disabled]',
    })
export class DisabledDirective {
    public static readonly disabled = 'disabled';
    public static readonly default = { directive: DisabledDirective, inputs: [DisabledDirective.disabled] };
    private readonly classes = inject(SortedClassesService);
    private isDisabled = false;

    public constructor() {
        this.classes.registerFallback(DisabledDirective.disabled);
    }

    public get disabled(): boolean {
        return this.isDisabled;
    }

    @Input()
    public set disabled(value: BooleanLike) {
        this.isDisabled = toBoolean(value);
        this.classes.set(DisabledDirective.disabled, this.isDisabled);
    }
}
