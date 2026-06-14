import { Directive } from '@angular/core';

/**
 * Marker only — has no runtime behaviour. Excludes the host element (and its content) from
 * the code extracted by the `mantic-sync-examples` CLI.
 *
 * ```html
 * <m-info m-doc-ignore>A documentation note that should not appear in the example code.</m-info>
 * ```
 */
@Directive({
    selector: '[m-doc-ignore]'
})
export class DocIgnoreDirective {
}
