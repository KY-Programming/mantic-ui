import { Directive, inject, Input } from '@angular/core';
import { BooleanLike } from '../models/boolean-like';
import { toBoolean } from '../helpers/to-boolean';
import { SortedClassesService } from '../services/sorted-classes.service';

@Directive({
    selector: '[-m-readonly]',
    standalone: true
})
export class ReadonlyDirective {
    public static readonly readonly = 'readonly';
    public static readonly default = { directive: ReadonlyDirective, inputs: [ReadonlyDirective.readonly] };
    private readonly classes = inject(SortedClassesService);
    private isReadonly = false;

    public constructor() {
        this.classes.register(ReadonlyDirective.readonly);
    }

    public get readonly(): boolean {
        return this.isReadonly;
    }

    @Input()
    public set readonly(value: BooleanLike) {
        this.isReadonly = toBoolean(value);
        this.classes.set(ReadonlyDirective.readonly, this.isReadonly);
    }
}
