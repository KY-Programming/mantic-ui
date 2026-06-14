import { Component, effect, input, output } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { toBoolean } from '../../helpers/to-boolean';
import { transformableModel } from '../../helpers/transformable-model';
import { BooleanLike } from '../../models/boolean-like';
import { LoaderSize } from './models/loader-size';

@Component({
    selector: 'm-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    providers: [...BaseComponent.providers],
    host: {
        '[class.inline]': 'inline()'
    }
})
export class LoaderComponent extends BaseComponent {
    public readonly text = input<string>();
    public readonly size = input<LoaderSize>();
    public readonly inline = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly inverted = input<boolean, BooleanLike>(false, { transform: toBoolean });
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly activeInput = input<boolean, BooleanLike>(false, { alias: 'active', transform: toBoolean });
    public readonly activeChange = output<boolean>();
    public readonly active = transformableModel(this.activeInput, this.activeChange, toBoolean);

    public constructor() {
        super();
        this.active.set(true);
        this.classes.register('inverted', 'active', 'text', 'size')
            .registerFixed('loader');
        effect(() => this.classes.set('inverted', this.inverted()));
        effect(() => this.classes.set('active', this.active()));
        effect(() => this.classes.set('text', this.text() || this.text() === ''));
        effect(() => this.classes.set('size', this.size()));
    }

}
