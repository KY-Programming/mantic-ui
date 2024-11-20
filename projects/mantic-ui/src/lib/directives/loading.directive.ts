import { Directive, inject, Input } from '@angular/core';
import { toBoolean } from '../helpers/to-boolean';
import { BooleanLike } from '../models/boolean-like';
import { SortedClassesService } from '../services/sorted-classes.service';

@Directive({
    selector: '[-m-loading]',
    })
export class LoadingDirective {
    public static readonly loading = 'loading';
    public static readonly default = { directive: LoadingDirective, inputs: [LoadingDirective.loading] };
    private readonly classes = inject(SortedClassesService);
    private isLoading = false;

    public constructor() {
        this.classes.registerFallback(LoadingDirective.loading);
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
