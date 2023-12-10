import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';

@Component({
    selector: 'm-menu-header',
    templateUrl: './menu-header.component.html',
    styleUrls: ['./menu-header.component.scss'],
    standalone: true,
    providers: [...BaseComponent.providers]
})
export class MenuHeaderComponent extends BaseComponent {

    public constructor() {
        super();
        this.classes.registerFixed('header', 'item');
    }

}
