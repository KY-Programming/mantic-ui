import { Directive, inject, Input } from '@angular/core';
import { toBoolean } from '../helpers/to-boolean';
import { BooleanLike } from '../models/boolean-like';
import { SortedClassesService } from '../services/sorted-classes.service';

@Directive({
    selector: '[-m-basic]',
    standalone: true
})
export class BasicDirective {
    public static readonly basic = 'basic';
    public static readonly default = { directive: BasicDirective, inputs: [BasicDirective.basic] };
    private readonly classes = inject(SortedClassesService);
    private isBasic = false;

    public constructor() {
        this.classes.registerFallback(BasicDirective.basic);
    }

    public get basic(): boolean {
        return this.isBasic;
    }

    @Input()
    public set basic(value: BooleanLike) {
        this.isBasic = toBoolean(value);
        this.classes.set(BasicDirective.basic, this.isBasic);
    }
}

