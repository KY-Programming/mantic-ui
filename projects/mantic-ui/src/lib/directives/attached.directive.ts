import { Directive, inject, input } from '@angular/core';
import { toBoolean } from '../helpers/to-boolean';
import { BooleanLike } from '../models/boolean-like';
import { SortedClassesService } from '../services/sorted-classes.service';

/**
 * Attaches a component to its neighbour by flattening the corners on the touching side.
 * The side names the component's own position: `attachedLeft` sits on the left of its neighbour, so its right corners become flat.
 * Only sets the `attached-*` classes; every component that uses it brings its own styles for them (in the themes), because the rounded element differs per component.
 * Used as host directive only: `hostDirectives: [AttachedDirective.default]`.
 */
@Directive({
    host: {
        '[class.attached-left]': 'attachedLeft()',
        '[class.attached-top]': 'attachedTop()',
        '[class.attached-right]': 'attachedRight()',
        '[class.attached-bottom]': 'attachedBottom()'
    }
})
export class AttachedDirective {
    public static readonly default = { directive: AttachedDirective, inputs: ['attachedLeft', 'attachedTop', 'attachedRight', 'attachedBottom'] };
    public readonly attachedLeft = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly attachedTop = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly attachedRight = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly attachedBottom = input<boolean, BooleanLike>(false, { transform: toBoolean });

    public constructor() {
        // The host's attribute check only knows the host's own inputs (reflectComponentType leaves out host directives), so these are announced as known, without becoming a class
        inject(SortedClassesService, { self: true, optional: true })?.ignore(...AttachedDirective.default.inputs);
    }
}
