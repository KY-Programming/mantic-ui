import { Component, input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { BooleanLike } from '../../models/boolean-like';
import { toBoolean } from '../../helpers/to-boolean';

@Component({
    selector: 'm-segment-group',
    templateUrl: './segment-group.component.html',
    styleUrls: ['./segment-group.component.scss'],
    providers: [...BaseComponent.providers],
    host: {
        '[class.horizontal]': 'horizontal()'
    }
})
export class SegmentGroupComponent extends BaseComponent {
    public readonly horizontal = input<boolean, BooleanLike>(false, { transform: toBoolean });

    public constructor() {
        super();
        this.classes.register('horizontal')
            .registerFixed('segments');
    }

}
