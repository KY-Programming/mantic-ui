import { Component, effect, input, signal } from '@angular/core';
import { InvertibleComponent } from '../../base/invertible.component';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { Align } from './models/align';

@Component({
    selector: 'm-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    providers: [...InvertibleComponent.providers]
})
export class TableComponent extends InvertibleComponent {
    public static readonly defaults = {
        inverted: signal(false)
    };
    public readonly notCelled = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly very = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly unstackable = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly aligned = input<Align>('middle');
    public readonly definition = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly collapsing = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly basic = input<boolean, BooleanLike>(false, { transform: toBoolean });

    public constructor() {
        super();
        this.classes.register('celled', 'notCelled', 'very', 'basic', 'unstackable', 'aligned', 'definition', 'collapsing')
            .registerFixed('table');
        effect(() => this.classes.set('aligned', this.aligned()));
        effect(() => this.classes.set('basic', this.basic()));
        effect(() => this.classes.set('celled', !this.notCelled()));
        effect(() => this.classes.set('very', this.very()));
        effect(() => this.classes.set('unstackable', this.unstackable()));
        effect(() => this.classes.set('definition', this.definition()));
        effect(() => this.classes.set('collapsing', this.collapsing()));
        effect(() => this.refreshInverted(TableComponent.defaults.inverted()));
    }
}
