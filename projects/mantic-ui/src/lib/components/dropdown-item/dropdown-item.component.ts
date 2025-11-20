import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { BooleanLike } from '../../models/boolean-like';
import { DropDownSelectionService } from '../dropdown/dropdown-selection.service';

@Component({
    selector: 'm-dropdown-item',
    templateUrl: './dropdown-item.component.html',
    styleUrls: ['./dropdown-item.component.scss'],
    providers: [...BaseComponent.providers]
})
export class DropdownItemComponent extends BaseComponent {
    private isFilteredOut = false;
    private isSelected = false;

    @Input()
    public value: unknown;

    @Input()
    @HostBinding('class.filtered')
    public get filteredOut(): boolean {
        return this.isFilteredOut;
    }

    public set filteredOut(value: BooleanLike) {
        this.isFilteredOut = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.active')
    @HostBinding('class.selected')
    public get selected(): boolean {
        return this.isSelected;
    }

    public set selected(value: BooleanLike) {
        this.isSelected = this.toBoolean(value);
    }

    @Input()
    public icon: string | undefined;

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
        this.dropDownSelectionService.select(this.value);
    }

    public select(value = true): void {
        this.selected = value;
    }
}
