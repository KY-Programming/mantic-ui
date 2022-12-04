import { Directive, inject, Input } from '@angular/core';
import { BooleanLike } from '../models/boolean-like';
import { toBoolean } from '../helpers/to-boolean';
import { SortedClassesService } from '../services/sorted-classes.service';

@Directive({
    selector: '[-m-fluid]',
    standalone: true
})
export class FluidDirective {
    public static readonly fluid = 'fluid';
    public static readonly default = { directive: FluidDirective, inputs: [FluidDirective.fluid] };
    private readonly classes = inject(SortedClassesService);
    private isFluid: boolean;

    public constructor() {
        this.classes.register(FluidDirective.fluid);
    }

    public get fluid(): boolean {
        return this.isFluid;
    }

    @Input()
    public set fluid(value: BooleanLike) {
        this.isFluid = toBoolean(value);
        this.classes.set(FluidDirective.fluid, this.isFluid);
    }
}
