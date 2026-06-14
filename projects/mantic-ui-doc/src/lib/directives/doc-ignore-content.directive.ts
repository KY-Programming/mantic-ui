import { Directive } from '@angular/core';

/**
 * Marker only — has no runtime behaviour. Keeps the host element in the code extracted by the
 * `mantic-sync-examples` CLI but drops its content, collapsing it to a self-closing tag.
 *
 * ```html
 * <m-toggle [(checked)]="readonly" m-doc-ignore-content>Read Only</m-toggle>
 * ```
 * is extracted as
 * ```html
 * <m-toggle [(checked)]="readonly" />
 * ```
 */
@Directive({
    selector: '[m-doc-ignore-content]'
})
export class DocIgnoreContentDirective {
}
