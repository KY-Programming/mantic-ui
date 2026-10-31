import { ContextMenuComponent } from '../context-menu.component';

export interface ContextMenuEvent extends Event {
    contextMenuTarget?: ContextMenuComponent;
    /** Set by a `keepOpen` item, so the click on it does not close its menu */
    keepContextMenuOpen?: boolean;
}
