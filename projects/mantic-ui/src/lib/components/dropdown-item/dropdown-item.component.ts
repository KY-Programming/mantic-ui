import { Component, HostBinding, HostListener, Input, ChangeDetectionStrategy, input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { BooleanLike } from '../../models/boolean-like';
import { DropDownSelectionService } from '../dropdown/dropdown-selection.service';

@Component({
    selector: 'm-dropdown-item',
    templateUrl: './dropdown-item.component.html',
    styleUrls: ['./dropdown-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    providers: [...BaseComponent.providers]
})
export class DropdownItemComponent extends BaseComponent {
    private isFilteredOut = false;
    private isSelected = false;

    public readonly value = input<unknown>();

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    @HostBinding('class.filtered')
    public get filteredOut(): boolean {
        return this.isFilteredOut;
    }

    public set filteredOut(value: BooleanLike) {
        this.isFilteredOut = this.toBoolean(value);
    }

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    @HostBinding('class.active')
    @HostBinding('class.selected')
    public get selected(): boolean {
        return this.isSelected;
    }

    public set selected(value: BooleanLike) {
        this.isSelected = this.toBoolean(value);
    }

    public readonly icon = input<string>();

    public readonly element = this.elementRef;

    public constructor(
        private readonly dropDownSelectionService: DropDownSelectionService
    ) {
        super();
        this.classes.register('filtered', 'selected', 'value')
            .registerFixed('item');
    }

    @HostListener('click', ['$event'])
    protected click(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.dropDownSelectionService.select(this.value());
    }

    public select(value = true): void {
        this.selected = value;
    }
}
