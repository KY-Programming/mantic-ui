import { Component, input } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';

@Component({
    selector: 'm-context-menu-group',
    templateUrl: './context-menu-group.component.html',
    styleUrls: ['./context-menu-group.component.scss'],
    providers: [...BaseComponent.providers]
})
export class ContextMenuGroupComponent extends BaseComponent {
    public readonly header = input.required<string>();

    public constructor() {
        super(false);
    }
}
