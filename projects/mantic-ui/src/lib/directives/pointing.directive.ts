import { Directive, inject, Input } from '@angular/core';
import { BooleanLike } from '../models/boolean-like';
import { toBoolean } from '../helpers/to-boolean';
import { SortedClassesService } from '../services/sorted-classes.service';

@Directive({
    selector: '[-m-pointing]',
    standalone: true
})
export class PointingDirective {
    public static readonly pointing = 'pointing';
    public static readonly default = { directive: PointingDirective, inputs: [PointingDirective.pointing] };
    private readonly classes = inject(SortedClassesService);
    private isPointing: boolean;

    public constructor() {
        this.classes.register(PointingDirective.pointing);
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
