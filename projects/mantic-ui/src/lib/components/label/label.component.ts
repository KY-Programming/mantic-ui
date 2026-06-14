import { Component, effect, input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { ColorName } from '../../models/color';
import { LabelOptions } from '../../models/label-options';
import { LabelPosition } from '../../models/label-position';
import { LabelPointing } from './models/label-pointing';

@Component({
    selector: 'm-label',
    templateUrl: './label.component.html',
    styleUrls: ['./label.component.scss'],
    providers: [...BaseComponent.providers],
    host: {
        '[class.horizontal]': 'horizontal()'
    }
})
export class LabelComponent extends BaseComponent implements LabelOptions {
    public readonly position = input<LabelPosition>();
    public readonly pointing = input<LabelPointing>();
    public readonly horizontal = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly basic = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly color = input<ColorName | undefined>(undefined);

    public constructor() {
        super();
        this.classes.register('basic', 'color', 'pointing', 'position', 'horizontal')
            .registerFixed('label');
        effect(() => this.classes.set('basic', this.basic()));
        effect(() => this.classes.set('color', this.color()));
        effect(() => this.classes.set('pointing', this.pointing()));
    }
}
