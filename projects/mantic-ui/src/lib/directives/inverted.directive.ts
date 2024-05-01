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
    private isInverted: boolean | undefined;
    private isInvertedDefault = false;

    @Input()
    public get inverted(): boolean {
        return this.isInverted ?? this.isInvertedDefault;
    }

    public set inverted(value: BooleanLike) {
        this.isInverted = toBoolean(value);
        this.classes.set(InvertedDirective.inverted, this.inverted);
    }

    public constructor() {
        this.classes.registerFallback(InvertedDirective.inverted);
    }

    public setInvertedDefault(value: boolean): void {
        this.isInvertedDefault = value;
        this.classes.set(InvertedDirective.inverted, this.inverted);
    }
}
