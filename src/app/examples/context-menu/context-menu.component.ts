import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'app-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuExampleComponent {
    @HostBinding('class.scrolling')
    public isScrolling = false;

    public readonly example1Code = `<m-button>
    Click Me Right
    <m-context-menu>
        <m-context-menu-item icon="trash" (click)="...">Delete</m-context-menu-item>
    </m-context-menu>
</m-button>`;

    public readonly example2Code = `<m-context-menu openOnLeftClick></m-context-menu>`;

    public readonly example3Code = `<m-context-menu>
    <m-context-menu-item keepOpen>I stay here</m-context-menu-item>
</m-context-menu>`;

    public readonly exampleSharedCode = `<m-flex>
    <m-button (contextmenu)="contextMenu.open($event)">One</m-button>
    <m-button (contextmenu)="contextMenu.open($event)">Two</m-button>
    <m-button (contextmenu)="contextMenu.open($event)">Three</m-button>
    <m-button (contextmenu)="contextMenu.open($event)">Four</m-button>
    <m-button (contextmenu)="contextMenu.open($event)">Five</m-button>
</m-flex>
<m-context-menu shared #contextMenu>
    <m-context-menu-item>One for all</m-context-menu-item>
</m-context-menu>`;

    public readonly exampleOpenByCodeHtmlCode = `<m-context-menu shared>
    ...
</m-context-menu>`;

    public readonly exampleOpenByCodeTsCode = `
import { ContextMenuComponent } from '@mantic-ui/angular';
...
@ViewChild(ContextMenuComponent)
public contextMenu?: ContextMenuComponent;
...
this.contextMenu?.open();`;

    public show(message: string): void {
        alert(message);
    }
}