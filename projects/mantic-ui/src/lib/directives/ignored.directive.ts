import { Directive, inject, Input } from '@angular/core';
import { toBoolean } from '../helpers/to-boolean';
import { BooleanLike } from '../models/boolean-like';
import { SortedClassesService } from '../services/sorted-classes.service';

@Directive({
    selector: '[-m-ignored]',
    })
export class IgnoredDirective {
    public static readonly ignored = 'ignored';
    public static readonly default = { directive: IgnoredDirective, inputs: [IgnoredDirective.ignored] };
    private readonly classes = inject(SortedClassesService);
    private isIgnored = false;

    public constructor() {
        this.classes.registerFallback(IgnoredDirective.ignored);
    }

    public get ignored(): boolean {
        return this.isIgnored;
    }

    @Input()
    public set ignored(value: BooleanLike) {
        this.isIgnored = toBoolean(value);
        this.classes.set(IgnoredDirective.ignored, this.isIgnored);
    }
}
