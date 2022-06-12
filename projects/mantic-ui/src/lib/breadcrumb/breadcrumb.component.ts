import { Component, HostBinding } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'm-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent extends BaseComponent {

    @HostBinding('class.breadcrumb')
    public readonly breadcrumb = true;

    public constructor() {
        super();
    }
}
