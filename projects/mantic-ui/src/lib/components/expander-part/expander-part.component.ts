import { Component, input, output, viewChild } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { toBoolean } from '../../helpers/to-boolean';
import { transformableModel } from '../../helpers/transformable-model';
import { BooleanLike } from '../../models/boolean-like';
import { ExpanderIconComponent } from '../expander-icon/expander-icon.component';
import { FillComponent } from '../flex/fill/fill.component';
import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';

@Component({
    selector: 'm-expander-part',
    templateUrl: './expander-part.component.html',
    styleUrls: ['./expander-part.component.scss'],
    imports: [FillComponent, ExpanderIconComponent],
    providers: [...BaseComponent.providers],
    host: {
        '[class.expandable]': 'expandable()',
        '[class.expanded]': 'expanded() && expandable() !== false',
        '(click)': 'onClick()'
    }
})
export class ExpanderPartComponent extends BaseComponent {
    public readonly expandable = input<boolean | undefined>(true);
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly expandedInput = input<boolean, BooleanLike>(false, { alias: 'expanded', transform: toBoolean });
    public readonly expandedChange = output<boolean>();
    public readonly expanded = transformableModel(this.expandedInput, this.expandedChange, toBoolean);
    public readonly dropdownIcon = input<IconType>();
    public readonly dropdownIconSize = input<IconSize>();
    protected readonly icon = viewChild(ExpanderIconComponent);

    public constructor() {
        super(false);
        this.classes.register('expanded', 'expandable');
    }

    protected onClick(): void {
        if (this.expandable() === false) {
            return;
        }
        this.icon()?.toggle();
    }
}
