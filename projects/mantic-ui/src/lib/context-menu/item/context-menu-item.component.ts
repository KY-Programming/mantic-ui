import { Component, ElementRef, HostBinding, HostListener, Input, Optional } from '@angular/core';
import { MenuItemComponent } from '../../menu-item/menu-item.component';
import { ContextMenuComponent } from '../context-menu.component';
import { BooleanLike } from '../../models/boolean-like';

@Component({
    selector: 'm-context-menu-item',
    templateUrl: './context-menu-item.component.html',
    styleUrls: ['./context-menu-item.component.scss']
})
export class ContextMenuItemComponent extends MenuItemComponent {
    private keepOpenValue: boolean;

    @Input()
    public icon: string;

    @Input()
    public get keepOpen(): boolean {
        return this.keepOpenValue;
    }

    public set keepOpen(value: BooleanLike) {
        this.keepOpenValue = this.toBoolean(value);
    }

    public constructor(
        @Optional() private readonly contextMenu: ContextMenuComponent,
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList.register('keepOpen', 'icon');
        this.link = true;
    }

    @HostListener('click')
    public onClick(): void {
        if (this.keepOpen) {
            return;
        }
        this.contextMenu.close();
    }
}
