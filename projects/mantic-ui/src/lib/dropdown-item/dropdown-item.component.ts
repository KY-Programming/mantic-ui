import { Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { DropDownSelectionService } from '../dropdown/dropdown-selection.service';
import { BaseComponent } from '../base/base.component';
import { BooleanLike } from '../models/boolean-like';

@Component({
    selector: 'm-dropdown-item',
    templateUrl: './dropdown-item.component.html',
    styleUrls: ['./dropdown-item.component.scss']
})
export class DropdownItemComponent extends BaseComponent {
    private isFilteredOut: boolean;
    private isSelected: boolean;

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
    public icon: string;

    @HostBinding('class.item')
    public readonly item = true;

    public constructor(
        private readonly dropDownSelectionService: DropDownSelectionService,
        public readonly elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList.register('filtered', 'selected', 'value');
    }

    @HostListener('click', ['$event'])
    public click(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.dropDownSelectionService.select(this.value);
    }

    public select(value = true): void {
        this.selected = value;
    }
}
