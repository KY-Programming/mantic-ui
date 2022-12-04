import { Directive, inject, Input } from '@angular/core';
import { BooleanLike } from '../models/boolean-like';
import { toBoolean } from '../helpers/to-boolean';
import { SortedClassesService } from '../services/sorted-classes.service';

@Directive({
    selector: '[-m-active]',
    standalone: true
})
export class ActiveDirective {
    public static readonly active = 'active';
    public static readonly default = { directive: ActiveDirective, inputs: [ActiveDirective.active] };
    private readonly classes = inject(SortedClassesService);
    private isActive: boolean;

    public constructor() {
        this.classes.register(ActiveDirective.active);
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
