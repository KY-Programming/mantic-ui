import { Component, HostBinding } from '@angular/core';
import { BaseComponent } from '../../base/base.component';

@Component({
    selector: 'm-divider',
    templateUrl: './divider.component.html',
    styleUrls: ['./divider.component.scss']
})
export class DividerComponent extends BaseComponent {

    @HostBinding('class.divider')
    public readonly divider = true;

    public constructor() {
        super();
    }
}
