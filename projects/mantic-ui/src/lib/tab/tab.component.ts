import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
    selector: 'm-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss']
})
export class TabComponent extends MenuItemComponent {

    @Input()
    public name: string;

    @Input()
    public label: string;

    @Input()
    public icon: string;

    constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.noClasses = true;
        this.classList.register('name', 'label', 'icon')
    }

}
