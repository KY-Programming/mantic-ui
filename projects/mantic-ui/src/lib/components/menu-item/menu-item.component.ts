import { Component, Inject, input, Optional, output } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { toBoolean } from '../../helpers/to-boolean';
import { transformableModel } from '../../helpers/transformable-model';
import { BooleanLike } from '../../models/boolean-like';

@Component({
    selector: 'm-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss'],
    providers: [...MenuItemComponent.providers],
    host: {
        '[class.active]': 'active()',
        '[class.link]': 'link()'
    }
})
export class MenuItemComponent extends BaseComponent {
    protected static override readonly providers = [...BaseComponent.providers];
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly activeInput = input<boolean, BooleanLike>(false, { alias: 'active', transform: toBoolean });
    public readonly activeChange = output<boolean>();
    public readonly active = transformableModel(this.activeInput, this.activeChange, toBoolean);
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly linkInput = input<boolean, BooleanLike>(false, { alias: 'link', transform: toBoolean });
    public readonly linkChange = output<boolean>();
    public readonly link = transformableModel(this.linkInput, this.linkChange, toBoolean);

    public constructor(
        // eslint-disable-next-line @angular-eslint/prefer-inject
        @Optional() @Inject('none') useUiClass = true
    ) {
        super(useUiClass);
        this.classes.register('active', 'link')
            .registerFixed('item');
    }
}
