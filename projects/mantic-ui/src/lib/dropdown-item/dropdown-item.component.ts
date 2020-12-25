import { Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { DropwDownSelectionService } from '../dropdown/dropdown-selection.service';
import { DropdownValue } from '../dropdown/dropdown-value';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'm-dropdown-item',
    templateUrl: './dropdown-item.component.html',
    styleUrls: ['./dropdown-item.component.scss']
})
export class DropdownItemComponent extends BaseComponent {
    private isFiltered: boolean;
    private isSelected: boolean;

    @Input()
    public value: unknown;

    @Input()
    @HostBinding('class.filtered')
    public get filtered(): boolean | string {
        return this.isFiltered;
    }

    public set filtered(value: string | boolean) {
        this.isFiltered = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.active')
    @HostBinding('class.selected')
    public get selected(): boolean | string {
        return this.isSelected;
    }

    public set selected(value: string | boolean) {
        this.isSelected = this.toBoolean(value);
    }

    @Input()
    public icon: string;

    @HostBinding('class.item')
    public readonly item = true;

    constructor(
        private readonly dropwDownSelectionService: DropwDownSelectionService,
        public readonly elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList
            .registerBoolean('filtered')
            .registerBoolean('selected', 'active selected');
    }

    @HostListener('click', ['$event'])
    public click(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.dropwDownSelectionService.select(this.value, this.elementRef);
    }

    public select(value = true): void {
        this.selected = value;
        // this.refreshClasses();
    }

    public toValue(): DropdownValue {
        return new DropdownValue(this.value, undefined, this.icon);
    }

}
