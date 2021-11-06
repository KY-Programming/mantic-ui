import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { NgIfContext } from '@angular/common';

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

    @Input()
    public template: TemplateRef<NgIfContext<boolean>>;

    @Output()
    public readonly activate = new EventEmitter<void>();

    @Output()
    public readonly deactivate = new EventEmitter<void>();

    constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef, false);
        this.classList.register('name', 'label', 'icon');
    }

}
