import { Component, computed, effect, input, signal } from '@angular/core';
import { InvertibleComponent } from '../../base/invertible.component';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { ColorName } from '../../models/color';
import { SegmentAttached } from './models/segment-attached';

@Component({
    selector: 'm-segment',
    templateUrl: './segment.component.html',
    styleUrls: ['./segment.component.scss'],
    providers: SegmentComponent.providers
})
export class SegmentComponent extends InvertibleComponent {
    public static readonly defaults = {
        inverted: signal(false),
        raised: signal(false)
    };
    protected static override readonly providers = [...InvertibleComponent.providers];
    private readonly raisedDefault = signal(false);
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly raisedInput = input<boolean | undefined, BooleanLike>(undefined, { alias: 'raised', transform: toBoolean });
    public readonly raised = computed(() => this.raisedInput() ?? this.raisedDefault());
    public readonly vertical = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly placeholder = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly secondary = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly tertiary = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly attached = input<SegmentAttached | undefined>();
    public readonly noPadding = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly noMargin = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly basic = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly color = input<ColorName | undefined>(undefined);
    public readonly loading = input<boolean, BooleanLike>(false, { transform: toBoolean });

    public constructor() {
        super();
        this.classes.register('basic', 'color', 'loading', 'raised', 'vertical', 'placeholder', 'secondary', 'tertiary', 'attached', 'attachedValue', 'noPadding', 'noMargin')
            .registerFixed('segment');
        effect(() => this.classes.set('basic', this.basic()));
        effect(() => this.classes.set('color', this.color()));
        effect(() => this.classes.set('loading', this.loading()));
        effect(() => this.classes.set('raised', this.raised()));
        effect(() => this.classes.set('vertical', this.vertical()));
        effect(() => this.classes.set('placeholder', this.placeholder()));
        effect(() => this.classes.set('secondary', this.secondary()));
        effect(() => this.classes.set('tertiary', this.tertiary()));
        effect(() => {
            const value = this.attached();
            this.classes.set('attachedValue', value);
            this.classes.set('attached', !!value);
        });
        effect(() => this.classes.set('noPadding', this.noPadding() ? 'no-padding' : undefined));
        effect(() => this.classes.set('noMargin', this.noMargin() ? 'no-margin' : undefined));
        effect(() => this.refreshInverted(SegmentComponent.defaults.inverted()));
        effect(() => this.refreshRaised(SegmentComponent.defaults.raised()));
    }

    private refreshRaised(value: boolean): void {
        this.raisedDefault.set(value);
    }
}
