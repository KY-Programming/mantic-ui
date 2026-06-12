import { NgIfContext, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Output, TemplateRef, ChangeDetectionStrategy, input } from '@angular/core';
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
    changeDetection: ChangeDetectionStrategy.Eager,
    providers: [SortedClassesService]
})
export class TabComponent extends MenuItemComponent {

    public readonly name = input<string>();

    public readonly label = input<string>();

    public readonly icon = input<IconType>();

    public readonly iconSize = input<IconSize>();

    // eslint-disable-next-line no-null/no-null
public readonly template = input<TemplateRef<NgIfContext<boolean>> | null>(null);

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
