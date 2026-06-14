import { Component, effect, input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';

@Component({
    selector: 'm-text-container',
    templateUrl: './text-container.component.html',
    styleUrls: ['./text-container.component.scss'],
    providers: [...BaseComponent.providers]
})
export class TextContainerComponent extends BaseComponent {
    public readonly fluid = input<boolean, BooleanLike>(false, { transform: toBoolean });

    public constructor() {
        super();
        this.classes.register('fluid')
            .registerFixed('text', 'container');
        effect(() => this.classes.set('fluid', this.fluid()));
    }
}
