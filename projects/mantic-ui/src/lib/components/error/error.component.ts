import { Component, effect, input } from '@angular/core';
import { InvertibleComponent } from '../../base/invertible.component';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { MessageComponent } from '../message/message.component';

@Component({
    selector: 'm-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss'],
    providers: [...InvertibleComponent.providers]
})
export class ErrorComponent extends InvertibleComponent {
    public readonly ignored = input<boolean, BooleanLike>(false, { transform: toBoolean });

    public constructor() {
        super();
        this.classes.register('ignored')
            .registerFixed('visible', 'error', 'message');
        effect(() => this.classes.set('ignored', this.ignored()));
        effect(() => this.refreshInverted(MessageComponent.defaults.inverted()));
    }
}
