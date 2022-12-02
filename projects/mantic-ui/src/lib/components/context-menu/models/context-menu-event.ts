import { ContextMenuComponent } from '../context-menu.component';

export interface ContextMenuEvent extends Event {
    contextMenuTarget?: ContextMenuComponent;
}
