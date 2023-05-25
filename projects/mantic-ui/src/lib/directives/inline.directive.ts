import { Directive, inject, Input } from '@angular/core';
import { BooleanLike } from '../models/boolean-like';
import { toBoolean } from '../helpers/to-boolean';
import { SortedClassesService } from '../services/sorted-classes.service';

@Directive({
    selector: '[-m-inline]',
    standalone: true
})
export class InlineDirective {
    public static readonly inline = 'inline';
    public static readonly default = { directive: InlineDirective, inputs: [InlineDirective.inline] };
    private readonly classes = inject(SortedClassesService);
    private isInline = false;

    public constructor() {
        this.classes.register(InlineDirective.inline);
    }

    public get inline(): boolean {
        return this.isInline;
    }

    @Input()
    public set inline(value: BooleanLike) {
        this.isInline = toBoolean(value);
        this.classes.set(InlineDirective.inline, this.isInline);
    }
}
