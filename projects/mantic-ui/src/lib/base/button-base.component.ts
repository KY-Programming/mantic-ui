import { Directive, effect, input, output } from '@angular/core';
import { toBoolean } from '../helpers/to-boolean';
import { transformableModel } from '../helpers/transformable-model';
import { BooleanLike } from '../models/boolean-like';
import { ColorName } from '../models/color';
import { InvertibleComponent } from './invertible.component';

@Directive({
    providers: ButtonBaseComponent.providers,
    host: {
        '[class.primary]': 'primary()',
        '[class.secondary]': 'secondary()',
        '[class.positive]': 'positive()',
        '[class.negative]': 'negative()',
        '[class.circular]': 'circular()',
        '[class.left]': 'attachedLeft()',
        '[class.top]': 'attachedTop()',
        '[class.right]': 'attachedRight()',
        '[class.bottom]': 'attachedBottom()',
        '[class.attached]': 'attached'
    }
})
export abstract class ButtonBaseComponent extends InvertibleComponent {
    protected static override readonly providers = [...InvertibleComponent.providers];
    public readonly primary = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly secondary = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly positive = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly negative = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly size = input('');
    public readonly circular = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly attachedLeft = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly attachedTop = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly attachedRight = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly attachedBottom = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly color = input<ColorName | undefined>(undefined);
    public readonly basic = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly disabled = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly loading = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly activeInput = input<boolean, BooleanLike>(false, { alias: 'active', transform: toBoolean });
    public readonly activeChange = output<boolean>();
    public readonly active = transformableModel(this.activeInput, this.activeChange, toBoolean);

    protected get attached(): boolean {
        return this.attachedTop() || this.attachedBottom() || this.attachedLeft() || this.attachedRight();
    }

    protected constructor() {
        super();
        this.elementRef.nativeElement.setAttribute('tabindex', '0');
        this.classes.register('color', 'basic', 'disabled', 'loading', 'active', 'size', 'primary', 'secondary', 'positive', 'negative', 'circular', 'tabindex', 'attachedLeft', 'attachedRight', 'attachedTop', 'attachedBottom')
            .registerFixed('button');
        effect(() => this.classes.set('color', this.color()));
        effect(() => this.classes.set('basic', this.basic()));
        effect(() => this.classes.set('disabled', this.disabled()));
        effect(() => this.classes.set('loading', this.loading()));
        effect(() => this.classes.set('active', this.active()));
        effect(() => this.classes.set('size', this.size()));
    }
}
