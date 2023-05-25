import { Directive, inject, Input } from '@angular/core';
import { BooleanLike } from '../models/boolean-like';
import { toBoolean } from '../helpers/to-boolean';
import { SortedClassesService } from '../services/sorted-classes.service';

@Directive({
    selector: '[-m-loading]',
    standalone: true
})
export class LoadingDirective {
    public static readonly loading = 'loading';
    public static readonly default = { directive: LoadingDirective, inputs: [LoadingDirective.loading] };
    private readonly classes = inject(SortedClassesService);
    private isLoading = false;

    public constructor() {
        this.classes.register(LoadingDirective.loading);
    }

    public get loading(): boolean {
        return this.isLoading;
    }

    @Input()
    public set loading(value: BooleanLike) {
        this.isLoading = toBoolean(value);
        this.classes.set(LoadingDirective.loading, this.isLoading);
    }
}
