import { Component, effect, input } from '@angular/core';
import { InvertibleComponent } from '../../base/invertible.component';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { MessageComponent } from '../message/message.component';

@Component({
    selector: 'm-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss'],
    providers: [...InvertibleComponent.providers]
})
export class InfoComponent extends InvertibleComponent {
    public readonly ignored = input<boolean, BooleanLike>(false, { transform: toBoolean });

    public constructor() {
        super();
        this.classes.register('ignored')
            .registerFixed('visible', 'info', 'message');
        effect(() => this.classes.set('ignored', this.ignored()));
        effect(() => this.refreshInverted(MessageComponent.defaults.inverted()));
    }
}
