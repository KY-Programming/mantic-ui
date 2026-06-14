import { Component, contentChild, effect, ElementRef, input, output, OutputEmitterRef, OutputRefSubscription, signal, untracked } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { toBoolean } from '../../helpers/to-boolean';
import { transformableModel } from '../../helpers/transformable-model';
import { BooleanLike } from '../../models/boolean-like';
import { FieldSize, ParsableFieldSize, parseFieldSize } from '../../models/field-size';
import { FormError } from '../../models/form-error';
import { FormValidation } from '../../models/form-validation';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { IconComponent } from '../icon/icon.component';
import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';
import { DateInputComponent } from '../input/date/date-input.component';
import { NumericInputComponent } from '../input/numeric/numeric-input.component';
import { InputComponent } from '../input/text/input.component';
import { RadioComponent } from '../radio/radio.component';
import { SliderComponent } from '../slider/slider.component';
import { TextareaComponent } from '../textarea/textarea.component';
import { ToggleComponent } from '../toggle/toggle.component';
import { FieldFormatErrorsPipe } from './field-format-errors.pipe';

@Component({
    selector: 'm-field',
    templateUrl: './field.component.html',
    styleUrls: ['./field.component.scss'],
    imports: [IconComponent, FieldFormatErrorsPipe],
    providers: [...BaseComponent.providers],
    host: {
        '[class.wide]': 'size()',
        '[class.error]': 'visibleError()',
        '[class.disabled]': 'disabled()',
        '[class.readonly]': 'readonly()',
        '[class.inline]': 'inline()',
        '[class.fill]': 'fill()'
    }
})
export class FieldComponent extends BaseComponent {
    public static readonly defaults = {
        hintIcon: signal<IconType>('info circle'),
        hintIconSize: signal<IconSize>(undefined),
        errorIcon: signal<IconType>('exclamation circle'),
        errorIconSize: signal<IconSize>(undefined)
    };
    protected readonly defaults = FieldComponent.defaults;
    private originalLabel?: string;
    private labelSaved = false;
    protected readonly wasAnytimeValid = signal(false);
    protected readonly labelElement = contentChild<ElementRef<HTMLLabelElement>>('labelElement');
    protected readonly inputComponent = contentChild(InputComponent);
    protected readonly numericInputComponent = contentChild(NumericInputComponent);
    protected readonly dateInputComponent = contentChild(DateInputComponent);
    protected readonly checkboxComponent = contentChild(CheckboxComponent);
    protected readonly sliderComponent = contentChild(SliderComponent);
    protected readonly toggleComponent = contentChild(ToggleComponent);
    protected readonly radioComponent = contentChild(RadioComponent);
    protected readonly textareaComponent = contentChild(TextareaComponent);
    protected readonly dropDownComponent = contentChild(DropdownComponent);
    public readonly name = input<string>();
    public readonly label = input<string>();
    public readonly hint = input<string>();
    public readonly size = input<FieldSize, ParsableFieldSize>('', { transform: value => parseFieldSize(value) });
    public readonly disabled = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly readonly = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly inline = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly hideInitialError = input(true);
    public readonly fill = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly ownLabel = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly forceLabel = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly valid = input<boolean | FormValidation | undefined>(undefined);
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly errorInput = input<boolean, BooleanLike>(false, { alias: 'error', transform: toBoolean });
    private readonly errorState = signal(false);
    public readonly error = this.errorState.asReadonly();
    protected readonly visibleError = signal(false);
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly inlineValidationInput = input<boolean, BooleanLike>(false, { alias: 'inlineValidation', transform: toBoolean });
    public readonly inlineValidationChange = output<boolean>();
    public readonly inlineValidation = transformableModel(this.inlineValidationInput, this.inlineValidationChange, toBoolean);
    public readonly errors = signal<FormError[]>([]);
    public readonly errorChange = output<boolean>();
    public readonly change = output();

    public constructor() {
        super(false);
        this.classes.registerFixed('field');
        this.classes.register('size', 'disabled', 'readonly', 'inline', 'label', 'fill', 'name');
        effect(() => this.classes.set('size', this.size()));

        // Propagate name/for to every projected child input (and the label element).
        effect(() => {
            const name = this.name();
            this.labelElement()?.nativeElement.setAttribute('for', name ?? '');
            this.inputComponent()?.for.set(name);
            this.inputComponent()?.name.set(name);
            this.numericInputComponent()?.for.set(name);
            this.numericInputComponent()?.name.set(name);
            this.dateInputComponent()?.for.set(name);
            this.dateInputComponent()?.name.set(name);
            this.checkboxComponent()?.name.set(name);
            this.sliderComponent()?.name.set(name);
            this.toggleComponent()?.name.set(name);
            this.radioComponent()?.name.set(name);
            this.textareaComponent()?.name.set(name);
            this.dropDownComponent()?.name.set(name);
        });

        // Propagate readonly.
        effect(() => {
            const readonly = this.readonly();
            this.inputComponent()?.readonly.set(readonly);
            this.numericInputComponent()?.readonly.set(readonly);
            this.dateInputComponent()?.readonly.set(readonly);
            this.textareaComponent()?.readonly.set(readonly);
            this.checkboxComponent()?.readonly.set(readonly);
            this.sliderComponent()?.readonly.set(readonly);
            this.toggleComponent()?.readonly.set(readonly);
            this.radioComponent()?.readonly.set(readonly);
            this.dropDownComponent()?.readonly.set(readonly);
        });

        // Propagate disabled.
        effect(() => {
            const disabled = this.disabled();
            this.inputComponent()?.disabled.set(disabled);
            this.numericInputComponent()?.disabled.set(disabled);
            this.dateInputComponent()?.disabled.set(disabled);
            this.textareaComponent()?.disabled.set(disabled);
            this.checkboxComponent()?.disabled.set(disabled);
            this.sliderComponent()?.disabled.set(disabled);
            this.toggleComponent()?.disabled.set(disabled);
            this.radioComponent()?.disabled.set(disabled);
            this.dropDownComponent()?.disabled.set(disabled);
        });

        // Propagate the field label to checkbox-family children (unless they own their label).
        effect(() => {
            const label = this.label();
            const ownLabel = this.ownLabel();
            const checkbox = this.checkboxComponent();
            const slider = this.sliderComponent();
            const toggle = this.toggleComponent();
            const radio = this.radioComponent();
            untracked(() => {
                this.propagateLabel(checkbox, label, ownLabel);
                this.propagateLabel(slider, label, ownLabel);
                this.propagateLabel(toggle, label, ownLabel);
                this.propagateLabel(radio, label, ownLabel);
            });
        });

        // Forward each child's value change as the field's change, re-wiring when the projected child changes.
        effect(onCleanup => {
            const subscriptions: OutputRefSubscription[] = [];
            const subscribe = <T>(component: { valueChange: OutputEmitterRef<T> } | undefined): void => {
                if (component) {
                    subscriptions.push(component.valueChange.subscribe(() => this.change.emit()));
                }
            };
            subscribe(this.inputComponent());
            subscribe(this.numericInputComponent());
            subscribe(this.dateInputComponent());
            subscribe(this.checkboxComponent());
            subscribe(this.sliderComponent());
            subscribe(this.toggleComponent());
            subscribe(this.radioComponent());
            subscribe(this.textareaComponent());
            subscribe(this.dropDownComponent());
            onCleanup(() => {
                for (const subscription of subscriptions) {
                    subscription.unsubscribe();
                }
            });
        });

        // External [error] binding flows through the same dedupe/emit the old setter did.
        effect(() => {
            const value = this.errorInput();
            untracked(() => this.setError(value));
        });

        // [valid] runs the validation logic.
        effect(() => {
            const value = this.valid();
            untracked(() => {
                if (value !== undefined) {
                    this.applyValidation(value);
                }
            });
        });
    }

    public forceValidation(): void {
        this.wasAnytimeValid.set(true);
        this.visibleError.set(this.error());
    }

    private propagateLabel(child: CheckboxComponent | undefined, label: string | undefined, ownLabel: boolean): void {
        if (!child) {
            return;
        }
        // Save the child's own label once, before the field ever overrides it, so ownLabel can restore it.
        if (!this.labelSaved) {
            this.originalLabel = child.label();
            this.labelSaved = true;
        }
        child.label.set(ownLabel ? this.originalLabel : label);
    }

    private setError(value: boolean): void {
        if (this.errorState() === value) {
            return;
        }
        this.errorState.set(value);
        this.visibleError.set(value);
        this.errorChange.emit(value);
    }

    private applyValidation(value: boolean | FormValidation): void {
        const oldError = this.error();
        const newError = typeof value === 'boolean' ? !value : !value.valid;
        if (newError) {
            const message = typeof value === 'boolean' ? '' : value.message ?? '';
            const label = ((typeof value === 'boolean') || (value.label === undefined) ? this.label() : value.label) ?? '';
            this.errors.set([{ message, label }]);
        }
        else {
            this.errors.set([]);
        }
        if (newError !== oldError) {
            this.setError(newError);
            this.refreshClasses();
        }
        if (!this.error()) {
            this.wasAnytimeValid.set(true);
        }
        else if (this.hideInitialError() && !this.wasAnytimeValid()) {
            this.visibleError.set(false);
        }
    }
}
