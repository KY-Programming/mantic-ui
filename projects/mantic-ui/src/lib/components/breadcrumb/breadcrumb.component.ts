import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';

@Component({
    selector: 'm-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    providers: [...BaseComponent.providers]
})
export class BreadcrumbComponent extends BaseComponent {

    public constructor() {
        super();
        this.classes.registerFixed('breadcrumb');
    }
}
