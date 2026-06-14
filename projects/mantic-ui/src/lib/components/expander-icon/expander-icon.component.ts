import { Component, input, output } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { toBoolean } from '../../helpers/to-boolean';
import { transformableModel } from '../../helpers/transformable-model';
import { BooleanLike } from '../../models/boolean-like';
import { ExpanderComponent } from '../expander/expander.component';
import { IconComponent } from '../icon/icon.component';
import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';

@Component({
    selector: 'm-expander-icon',
    templateUrl: './expander-icon.component.html',
    styleUrls: ['./expander-icon.component.scss'],
    imports: [IconComponent],
    providers: [...BaseComponent.providers],
    host: {
        '[class.expanded]': 'expanded()'
    }
})
export class ExpanderIconComponent extends BaseComponent {
    protected readonly defaults = ExpanderComponent.defaults;
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly expandedInput = input<boolean, BooleanLike>(false, { alias: 'expanded', transform: toBoolean });
    public readonly expandedChange = output<boolean>();
    public readonly expanded = transformableModel(this.expandedInput, this.expandedChange, toBoolean);
    public readonly dropdownIcon = input<IconType>();
    public readonly dropdownIconSize = input<IconSize>();

    public constructor() {
        super();
        this.classes.register('expanded');
    }

    public toggle(): void {
        if (this.expanded()) {
            this.collapse();
        }
        else {
            this.expand();
        }
    }

    public collapse(): void {
        this.expanded.set(false);
    }

    public expand(): void {
        this.expanded.set(true);
    }
}
