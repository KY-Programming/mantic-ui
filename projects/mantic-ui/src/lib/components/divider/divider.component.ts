import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';

@Component({
    selector: 'm-divider',
    templateUrl: './divider.component.html',
    styleUrls: ['./divider.component.scss'],
    standalone: true,
    hostDirectives: [...BaseComponent.directives],
    providers: [...BaseComponent.providers]
})
export class DividerComponent extends BaseComponent {

    public constructor() {
        super();
        this.classes.registerFixed('divider');
    }
}
