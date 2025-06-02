import { NgIfContext, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { SortedClassesService } from '../../services/sorted-classes.service';
import { IconSize } from '../icon/icon-size';
import { IconType } from '../icon/icon-type';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
    selector: 'm-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss'],
    imports: [
        NgTemplateOutlet
    ],
    providers: [SortedClassesService]
})
export class TabComponent extends MenuItemComponent {

    @Input()
    public name: string | undefined;

    @Input()
    public label: string | undefined;

    @Input()
    public icon: IconType | undefined;

    @Input()
    public iconSize: IconSize;

    @Input()
    // eslint-disable-next-line no-null/no-null
    public template: TemplateRef<NgIfContext<boolean>> | null = null;

    @Output()
    public readonly activate = new EventEmitter<void>();

    @Output()
    public readonly deactivate = new EventEmitter<void>();

    public constructor() {
        super(false);
        this.classes.register('name', 'label', 'icon');
    }

    public changeState(value: boolean | undefined): void {
        if (value === undefined || value === this.active) {
            return;
        }
        this.active = value;
        this.activeChange.emit(value);
        if (value) {
            this.activate.emit();
        }
        else {
            this.deactivate.emit();
        }
    }
}
