import { Directive, inject, Input } from '@angular/core';
import { toBoolean } from '../helpers/to-boolean';
import { BooleanLike } from '../models/boolean-like';
import { SortedClassesService } from '../services/sorted-classes.service';

@Directive({
    selector: '[-m-inverted]',
    standalone: true
})
export class InvertedDirective {
    public static readonly inverted = 'inverted';
    public static readonly default = { directive: InvertedDirective, inputs: [InvertedDirective.inverted] };
    private readonly classes = inject(SortedClassesService);
    private isInverted = false;

    public constructor() {
        this.classes.registerFallback(InvertedDirective.inverted);
    }

    public get inverted(): boolean {
        return this.isInverted;
    }

    @Input()
    public set inverted(value: BooleanLike) {
        this.isInverted = toBoolean(value);
        this.classes.set(InvertedDirective.inverted, this.isInverted);
    }
}
