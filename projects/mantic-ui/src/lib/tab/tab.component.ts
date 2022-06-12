import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { NgIfContext } from '@angular/common';
import { IconType } from '../icon/icon-type';
import { IconSize } from '../icon/icon-size';

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
    public icon: IconType;

    @Input()
    public iconSize: IconSize;

    @Input()
    public template: TemplateRef<NgIfContext<boolean>>;

    @Output()
    public readonly activate = new EventEmitter<void>();

    @Output()
    public readonly deactivate = new EventEmitter<void>();

    public constructor() {
        super(false);
        this.classList.register('name', 'label', 'icon');
    }

}
