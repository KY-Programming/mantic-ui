import { Directive, inject, Input } from '@angular/core';
import { BooleanLike } from '../models/boolean-like';
import { toBoolean } from '../helpers/to-boolean';
import { SortedClassesService } from '../services/sorted-classes.service';

@Directive({
    selector: '[-m-disabled]',
    standalone: true
})
export class DisabledDirective {
    public static readonly disabled = 'disabled';
    public static readonly default = { directive: DisabledDirective, inputs: [DisabledDirective.disabled] };
    private readonly classes = inject(SortedClassesService);
    private isDisabled: boolean;

    public constructor() {
        this.classes.register(DisabledDirective.disabled);
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
