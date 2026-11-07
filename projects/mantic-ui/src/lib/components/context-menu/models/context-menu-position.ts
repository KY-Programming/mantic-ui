/**
 * Where an `m-context-menu` places itself:
 * - `shift`: at the pointer, only pushed back into the viewport where it would stick out
 * - `flip`: at the pointer, which always stays at one of its corners; where there is no room right of / below the
 *   pointer, it opens to the left / upwards
 * - `anchor`: at an element (its `anchor`, else the element it was opened on, else its parent) - below it and aligned
 *   to its left edge, or above it / aligned to its right edge where there is no room
 *
 * Where `flip` and `anchor` find no room in any direction, the menu is pushed into the viewport like `shift`.
 */
export type ContextMenuPosition = 'shift' | 'flip' | 'anchor';
