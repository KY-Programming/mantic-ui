import { Directive, inject, Input } from '@angular/core';
import { toBoolean } from '../helpers/to-boolean';
import { BooleanLike } from '../models/boolean-like';
import { SortedClassesService } from '../services/sorted-classes.service';

@Directive({
    selector: '[-m-pointing]',
    })
export class PointingDirective {
    public static readonly pointing = 'pointing';
    public static readonly default = { directive: PointingDirective, inputs: [PointingDirective.pointing] };
    private readonly classes = inject(SortedClassesService);
    private isPointing = false;

    public constructor() {
        this.classes.registerFallback(PointingDirective.pointing);
    }

    public get pointing(): boolean {
        return this.isPointing;
    }

    @Input()
    public set pointing(value: BooleanLike) {
        this.isPointing = toBoolean(value);
        this.classes.set(PointingDirective.pointing, this.isPointing);
    }
}
