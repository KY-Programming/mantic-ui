import { Component, computed, effect, input, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvertibleComponent } from '../../base/invertible.component';
import { toBoolean } from '../../helpers/to-boolean';
import { transformableModel } from '../../helpers/transformable-model';
import { BooleanLike } from '../../models/boolean-like';
import { Key } from '../../models/key';
import { IconComponent } from '../icon/icon.component';
import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';

@Component({
    selector: 'm-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    imports: [IconComponent, FormsModule],
    providers: CheckboxComponent.providers,
    host: {
        '[class.checked]': 'checked()',
        '[class.indeterminate]': 'indeterminate()',
        '[class.fitted]': 'fitted()',
        '(click)': 'onClick($event)',
        '(keydown)': 'onKeyDown($event)'
    }
})
export class CheckboxComponent extends InvertibleComponent {
    public static readonly defaults = {
        checkIcon: signal<IconType>('check'),
        checkIconSize: signal<IconSize>('small'),
        indeterminateIcon: signal<IconType>('minus'),
        indeterminateIconSize: signal<IconSize>('small'),
        inverted: signal(false)
    };
    protected static override readonly providers = [...InvertibleComponent.providers];
    protected readonly defaults = CheckboxComponent.defaults;
    protected readonly checkedState = signal<boolean | undefined>(false);
    private readonly indeterminateState = signal(false);
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly valueInput = input<boolean | undefined, BooleanLike>(undefined, { alias: 'value', transform: toBoolean });
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly checkedInput = input<boolean | undefined, BooleanLike>(undefined, { alias: 'checked', transform: toBoolean });
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly indeterminateInput = input<boolean | undefined, BooleanLike>(undefined, { alias: 'indeterminate', transform: toBoolean });
    public readonly value = computed(() => this.checkedState());
    public readonly checked = computed(() => this.checkedState() ?? false);
    public readonly indeterminate = computed(() => this.indeterminateState());
    public readonly valueChange = output<boolean | undefined>();
    public readonly checkedChange = output<boolean>();
    public readonly indeterminateChange = output<boolean>();
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly readonlyInput = input<boolean, BooleanLike>(false, { alias: 'readonly', transform: toBoolean });
    public readonly readonlyChange = output<boolean>();
    public readonly readonly = transformableModel(this.readonlyInput, this.readonlyChange, toBoolean);
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly disabledInput = input<boolean, BooleanLike>(false, { alias: 'disabled', transform: toBoolean });
    public readonly disabledChange = output<boolean>();
    public readonly disabled = transformableModel(this.disabledInput, this.disabledChange, toBoolean);
    public readonly name = model<string>();
    public readonly label = model<string>();
    public readonly canUncheck = model(true);
    public readonly checkIcon = input<IconType>();
    public readonly checkIconSize = input<IconSize>();
    public readonly indeterminateIcon = input<IconType>();
    public readonly indeterminateIconSize = input<IconSize>();
    public readonly fitted = input<boolean, BooleanLike>(false, { transform: toBoolean });

    public constructor() {
        super();
        this.classes.register('disabled', 'read-only', 'indeterminate', 'fitted', 'checked', 'value', 'name', 'label', 'readonly')
            .registerFixed('checkbox');
        effect(() => this.refreshInverted(CheckboxComponent.defaults.inverted()));
        effect(() => this.classes.set('read-only', this.readonly()));
        effect(() => this.classes.set('disabled', this.disabled()));
        effect(() => {
            const value = this.valueInput();
            if (value !== undefined) {
                this.checkedState.set(value);
            }
        });
        effect(() => {
            const value = this.checkedInput();
            if (value !== undefined) {
                this.checkedState.set(value);
            }
        });
        effect(() => {
            const value = this.indeterminateInput();
            if (value !== undefined) {
                this.indeterminateState.set(value);
            }
        });
    }

    protected onClick(event: MouseEvent): void {
        if (event.target instanceof HTMLInputElement || this.readonly() || this.disabled()) {
            return;
        }
        this.set(!this.value());
    }

    protected onKeyDown(event: KeyboardEvent): void {
        if (this.readonly() || this.disabled() || !Key.space.is(event)) {
            return;
        }
        event.preventDefault();
        this.set(!this.value());
    }

    protected set(value: boolean): void {
        if (!value && !this.canUncheck()) {
            return;
        }
        if (this.indeterminateState()) {
            this.indeterminateState.set(false);
            this.indeterminateChange.emit(false);
        }
        if (this.value() !== value) {
            this.checkedState.set(value);
            this.onChange();
        }
        this.refreshClasses();
    }

    protected onChange(): void {
        this.valueChange.emit(this.value());
        this.checkedChange.emit(this.checked());
    }

}
