import { Directive, inject, Input } from '@angular/core';
import { toBoolean } from '../helpers/to-boolean';
import { BooleanLike } from '../models/boolean-like';
import { SortedClassesService } from '../services/sorted-classes.service';

@Directive({
    selector: '[-m-active]',
    standalone: true
})
export class ActiveDirective {
    public static readonly active = 'active';
    public static readonly default = { directive: ActiveDirective, inputs: [ActiveDirective.active] };
    private readonly classes = inject(SortedClassesService);
    private isActive = false;

    public constructor() {
        this.classes.registerFallback(ActiveDirective.active);
    }

    public get active(): boolean {
        return this.isActive;
    }

    @Input()
    public set active(value: BooleanLike) {
        this.isActive = toBoolean(value);
        this.classes.set(ActiveDirective.active, this.isActive);
    }
}
