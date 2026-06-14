import { Component, inject, input, output } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { toBoolean } from '../../helpers/to-boolean';
import { transformableModel } from '../../helpers/transformable-model';
import { BooleanLike } from '../../models/boolean-like';
import { DropDownSelectionService } from '../dropdown/dropdown-selection.service';

@Component({
    selector: 'm-dropdown-item',
    templateUrl: './dropdown-item.component.html',
    styleUrls: ['./dropdown-item.component.scss'],
    providers: [...BaseComponent.providers],
    host: {
        '[class.filtered]': 'filteredOut()',
        '[class.active]': 'selected()',
        '[class.selected]': 'selected()',
        '(click)': 'click($event)'
    }
})
export class DropdownItemComponent extends BaseComponent {
    private readonly dropDownSelectionService = inject(DropDownSelectionService);
    public readonly value = input<unknown>();
    public readonly icon = input<string>();
    public readonly element = this.elementRef;
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly filteredOutInput = input<boolean, BooleanLike>(false, { alias: 'filteredOut', transform: toBoolean });
    public readonly filteredOutChange = output<boolean>();
    public readonly filteredOut = transformableModel(this.filteredOutInput, this.filteredOutChange, toBoolean);
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly selectedInput = input<boolean, BooleanLike>(false, { alias: 'selected', transform: toBoolean });
    public readonly selectedChange = output<boolean>();
    public readonly selected = transformableModel(this.selectedInput, this.selectedChange, toBoolean);

    public constructor() {
        super();
        this.classes.register('filtered', 'selected', 'value')
            .registerFixed('item');
    }

    protected click(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.dropDownSelectionService.select(this.value());
    }

    public select(value = true): void {
        this.selected.set(value);
    }
}
