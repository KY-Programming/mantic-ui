import { Directive, inject, Input } from '@angular/core';
import { BooleanLike } from '../models/boolean-like';
import { toBoolean } from '../helpers/to-boolean';
import { SortedClassesService } from '../services/sorted-classes.service';

@Directive({
    selector: '[-m-read-only]',
    standalone: true
})
export class ReadOnlyDirective {
    public static readonly readonly = 'readonly';
    private static readonly readOnly = 'read-only';
    public static readonly default = { directive: ReadOnlyDirective, inputs: [ReadOnlyDirective.readonly] };
    private readonly classes = inject(SortedClassesService);
    private isReadonly = false;

    public constructor() {
        this.classes.register(ReadOnlyDirective.readOnly);
    }

    public get readonly(): boolean {
        return this.isReadonly;
    }

    @Input()
    public set readonly(value: BooleanLike) {
        this.isReadonly = toBoolean(value);
        this.classes.set(ReadOnlyDirective.readOnly, this.isReadonly);
    }
}
