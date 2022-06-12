import { Component, ElementRef, HostBinding } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'm-menu-header',
    templateUrl: './menu-header.component.html',
    styleUrls: ['./menu-header.component.scss']
})
export class MenuHeaderComponent extends BaseComponent {

    @HostBinding('class.header')
    @HostBinding('class.item')
    public readonly menuHeader = true;

    public constructor() {
        super();
    }

}
