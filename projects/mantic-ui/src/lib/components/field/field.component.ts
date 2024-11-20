import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../../base/base.component';
import { BooleanLike } from '../../models/boolean-like';
import { FieldSize, ParsableFieldSize, parseFieldSize } from '../../models/field-size';
import { FormError } from '../../models/form-error';
import { FormValidation } from '../../models/form-validation';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { IconSize } from '../icon/icon-size';
import { IconType } from '../icon/icon-type';
import { IconComponent } from '../icon/icon.component';
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
    imports: [
        CommonModule,
        IconComponent,
        FieldFormatErrorsPipe
    ],
    providers: [...BaseComponent.providers]
})
export class FieldComponent extends BaseComponent {
    public static readonly defaults = {
        hintIcon: <IconType>'info circle',
        hintIconSize: <IconSize>undefined,
        errorIcon: <IconType>'exclamation circle',
        errorIconSize: <IconSize>undefined
    };
    private labelElementValue?: HTMLLabelElement;
    private inputComponentValue?: InputComponent;
    private numericInputComponentValue?: NumericInputComponent;
    private dateInputComponentValue?: DateInputComponent;
    private checkboxComponentValue?: CheckboxComponent;
    private sliderComponentValue?: SliderComponent;
    private toggleComponentValue?: ToggleComponent;
    private radioComponentValue?: RadioComponent;
    private textareaComponentValue?: TextareaComponent;
    private dropDownComponentValue?: DropdownComponent;
    private nameValue?: string;
    private labelValue?: string;
    private sizeValue: FieldSize = '';
    private disabledValue = false;
    private readonlyValue = false;
    private errorValue = false;
    private hideInitialErrorValue = true;
    private isInline = false;
    private isFill = false;

    protected wasAnytimeValid = false;
    public readonly errors: FormError[] = [];
    protected readonly defaults = FieldComponent.defaults;
    private isInlineValidation = false;
    private hasOwnLabel = false;
    private isForceLabel = false;
    private originalLabel?: string;

    @ContentChild('labelElement')
    protected get labelElement(): HTMLLabelElement | undefined {
        return this.labelElementValue;
    }

    protected set labelElement(value: HTMLLabelElement | undefined) {
        this.labelElementValue = value;
        if (this.labelElementValue && this.name) {
            this.labelElementValue.setAttribute('for', this.name);
        }
    }

    @ContentChild(InputComponent)
    protected get inputComponent(): InputComponent | undefined {
        return this.inputComponentValue;
    }

    protected set inputComponent(value: InputComponent | undefined) {
        this.inputComponentValue = value;
        if (this.inputComponentValue) {
            this.inputComponentValue.for = this.name;
            this.inputComponentValue.name = this.name;
            this.inputComponentValue.readonly = this.readonly;
            this.inputComponentValue.disabled = this.disabled;
            this.inputComponentValue.valueChange.pipe(takeUntil(this.destroy)).subscribe(() => this.change.next());
        }
    }

    @ContentChild(NumericInputComponent)
    protected get numericInputComponent(): NumericInputComponent | undefined {
        return this.numericInputComponentValue;
    }

    protected set numericInputComponent(value: NumericInputComponent | undefined) {
        this.numericInputComponentValue = value;
        if (this.numericInputComponentValue) {
            this.numericInputComponentValue.for = this.name;
            this.numericInputComponentValue.name = this.name;
            this.numericInputComponentValue.readonly = this.readonly;
            this.numericInputComponentValue.disabled = this.disabled;
            this.numericInputComponentValue.valueChange.pipe(takeUntil(this.destroy)).subscribe(() => this.change.next());
        }
    }

    @ContentChild(DateInputComponent)
    protected get dateInputComponent(): DateInputComponent | undefined {
        return this.dateInputComponentValue;
    }

    protected set dateInputComponent(value: DateInputComponent | undefined) {
        this.dateInputComponentValue = value;
        if (this.dateInputComponentValue) {
            this.dateInputComponentValue.for = this.name;
            this.dateInputComponentValue.name = this.name;
            this.dateInputComponentValue.readonly = this.readonly;
            this.dateInputComponentValue.disabled = this.disabled;
            this.dateInputComponentValue.valueChange.pipe(takeUntil(this.destroy)).subscribe(() => this.change.next());
        }
    }

    @ContentChild(CheckboxComponent)
    protected get checkboxComponent(): CheckboxComponent | undefined {
        return this.checkboxComponentValue;
    }

    protected set checkboxComponent(value: CheckboxComponent | undefined) {
        this.checkboxComponentValue = value;
        if (this.checkboxComponentValue) {
            this.checkboxComponentValue.name = this.name;
            if (!this.ownLabel) {
                this.checkboxComponentValue.label = this.label;
            }
            this.checkboxComponentValue.readonly = this.readonly;
            this.checkboxComponentValue.disabled = this.disabled;
            this.checkboxComponentValue.valueChange.pipe(takeUntil(this.destroy)).subscribe(() => this.change.next());
        }
    }

    @ContentChild(SliderComponent)
    protected get sliderComponent(): SliderComponent | undefined {
        return this.sliderComponentValue;
    }

    protected set sliderComponent(value: SliderComponent | undefined) {
        this.sliderComponentValue = value;
        if (this.sliderComponentValue) {
            this.sliderComponentValue.name = this.name;
            if (!this.ownLabel) {
                this.sliderComponentValue.label = this.label;
            }
            this.sliderComponentValue.readonly = this.readonly;
            this.sliderComponentValue.disabled = this.disabled;
            this.sliderComponentValue.valueChange.pipe(takeUntil(this.destroy)).subscribe(() => this.change.next());
        }
    }

    @ContentChild(ToggleComponent)
    protected get toggleComponent(): ToggleComponent | undefined {
        return this.toggleComponentValue;
    }

    protected set toggleComponent(value: ToggleComponent | undefined) {
        this.toggleComponentValue = value;
        if (this.toggleComponentValue) {
            this.toggleComponentValue.name = this.name;
            if (!this.ownLabel) {
                this.toggleComponentValue.label = this.label;
            }
            this.toggleComponentValue.readonly = this.readonly;
            this.toggleComponentValue.disabled = this.disabled;
            this.toggleComponentValue.valueChange.pipe(takeUntil(this.destroy)).subscribe(() => this.change.next());
        }
    }

    @ContentChild(RadioComponent)
    protected get radioComponent(): RadioComponent | undefined {
        return this.radioComponentValue;
    }

    protected set radioComponent(value: RadioComponent | undefined) {
        this.radioComponentValue = value;
        if (this.radioComponentValue) {
            this.radioComponentValue.name = this.name;
            if (!this.ownLabel) {
                this.radioComponentValue.label = this.label;
            }
            this.radioComponentValue.readonly = this.readonly;
            this.radioComponentValue.disabled = this.disabled;
            this.radioComponentValue.valueChange.pipe(takeUntil(this.destroy)).subscribe(() => this.change.next());
        }
    }

    @ContentChild(TextareaComponent)
    protected get textareaComponent(): TextareaComponent | undefined {
        return this.textareaComponentValue;
    }

    protected set textareaComponent(value: TextareaComponent | undefined) {
        this.textareaComponentValue = value;
        if (this.textareaComponentValue) {
            this.textareaComponentValue.name = this.name;
            this.textareaComponentValue.readonly = this.readonly;
            this.textareaComponentValue.disabled = this.disabled;
            this.textareaComponentValue.valueChange.pipe(takeUntil(this.destroy)).subscribe(() => this.change.next());
        }
    }

    @ContentChild(DropdownComponent)
    protected get dropDownComponent(): DropdownComponent | undefined {
        return this.dropDownComponentValue;
    }

    protected set dropDownComponent(value: DropdownComponent | undefined) {
        this.dropDownComponentValue = value;
        if (this.dropDownComponentValue) {
            this.dropDownComponentValue.name = this.name;
            this.dropDownComponentValue.readonly = this.readonly;
            this.dropDownComponentValue.disabled = this.disabled;
            this.dropDownComponentValue.valueChange.pipe(takeUntil(this.destroy)).subscribe(() => this.change.next());
        }
    }

    @Input()
    public get name(): string | undefined {
        return this.nameValue;
    }

    public set name(value: string | undefined) {
        this.nameValue = value;
        if (this.labelElement) {
            this.labelElement.setAttribute('for', value ?? '');
        }
        if (this.inputComponent) {
            this.inputComponent.for = value;
            this.inputComponent.name = value;
        }
        if (this.numericInputComponent) {
            this.numericInputComponent.for = value;
            this.numericInputComponent.name = value;
        }
        if (this.dateInputComponent) {
            this.dateInputComponent.for = value;
            this.dateInputComponent.name = value;
        }
        if (this.checkboxComponent) {
            this.checkboxComponent.name = value;
        }
        if (this.sliderComponent) {
            this.sliderComponent.name = value;
        }
        if (this.toggleComponent) {
            this.toggleComponent.name = value;
        }
        if (this.radioComponent) {
            this.radioComponent.name = value;
        }
        if (this.textareaComponent) {
            this.textareaComponent.name = value;
        }
        if (this.dropDownComponent) {
            this.dropDownComponent.name = value;
        }
    }

    @Input()
    public get label(): string | undefined {
        return this.labelValue;
    }

    public set label(value: string | undefined) {
        this.labelValue = value;
        if (this.checkboxComponent) {
            if (!this.ownLabel) {
                this.originalLabel = this.checkboxComponent.label;
                this.checkboxComponent.label = value;
            }
            else if (this.originalLabel) {
                this.checkboxComponent.label = this.originalLabel;
            }
        }
        if (this.sliderComponent) {
            if (!this.ownLabel) {
                this.originalLabel = this.sliderComponent.label;
                this.sliderComponent.label = value;
            }
            else if (this.originalLabel) {
                this.sliderComponent.label = this.originalLabel;
            }
        }
        if (this.toggleComponent) {
            if (!this.ownLabel) {
                this.originalLabel = this.toggleComponent.label;
                this.toggleComponent.label = value;
            }
            else if (this.originalLabel) {
                this.toggleComponent.label = this.originalLabel;
            }
        }
        if (this.radioComponent) {
            if (!this.ownLabel) {
                this.originalLabel = this.radioComponent.label;
                this.radioComponent.label = value;
            }
            else if (this.originalLabel) {
                this.radioComponent.label = this.originalLabel;
            }
        }
    }

    @Input()
    public hint: string | undefined;

    @Input()
    @HostBinding('class.wide')
    public get size(): FieldSize {
        return this.sizeValue;
    }

    public set size(value: ParsableFieldSize) {
        this.sizeValue = parseFieldSize(value) ?? '';
        this.classes.set('size', this.sizeValue);
    }

    @Input()
    public get error(): boolean {
        return this.errorValue;
    }

    public set error(value: BooleanLike) {
        value = this.toBoolean(value);
        if (this.errorValue === value) {
            return;
        }
        this.errorValue = value;
        this.visibleError = value;
        this.errorChange.emit(value);
    }

    @HostBinding('class.error')
    protected visibleError = false;

    @Input()
    public set valid(value: boolean | FormValidation) {
        const oldError = this.error;
        const newError = typeof value === 'boolean' ? !value : value && !value.valid;
        this.errors.length = 0;
        if (newError) {
            const message = typeof value === 'boolean' ? '' : value.message ?? '';
            const label = (typeof value === 'boolean' ? this.label : value.label === undefined ? this.label : value.label) ?? '';
            this.errors.push({ message, label });
        }
        if (newError !== oldError) {
            this.error = newError;
            this.refreshClasses();
        }
        if (!this.error) {
            this.wasAnytimeValid = true;
        }
        else if (this.hideInitialError && !this.wasAnytimeValid) {
            this.visibleError = false;
        }
    }

    @Input()
    @HostBinding('class.disabled')
    public get disabled(): boolean {
        return this.disabledValue;
    }

    public set disabled(value: BooleanLike) {
        this.disabledValue = this.toBoolean(value);
        if (this.inputComponent) {
            this.inputComponent.disabled = value;
        }
        if (this.numericInputComponent) {
            this.numericInputComponent.disabled = value;
        }
        if (this.dateInputComponent) {
            this.dateInputComponent.disabled = value;
        }
        if (this.checkboxComponent) {
            this.checkboxComponent.disabled = value;
        }
        if (this.toggleComponent) {
            this.toggleComponent.disabled = value;
        }
        if (this.sliderComponent) {
            this.sliderComponent.disabled = value;
        }
        if (this.radioComponent) {
            this.radioComponent.disabled = value;
        }
        if (this.textareaComponent) {
            this.textareaComponent.disabled = value;
        }
        if (this.dropDownComponent) {
            this.dropDownComponent.disabled = value;
        }
    }

    @Input()
    @HostBinding('class.readonly')
    public get readonly(): boolean {
        return this.readonlyValue;
    }

    public set readonly(value: BooleanLike) {
        this.readonlyValue = this.toBoolean(value);
        if (this.inputComponent) {
            this.inputComponent.readonly = value;
        }
        if (this.numericInputComponent) {
            this.numericInputComponent.readonly = value;
        }
        if (this.dateInputComponent) {
            this.dateInputComponent.readonly = value;
        }
        if (this.checkboxComponent) {
            this.checkboxComponent.readonly = value;
        }
        if (this.toggleComponent) {
            this.toggleComponent.readonly = value;
        }
        if (this.sliderComponent) {
            this.sliderComponent.readonly = value;
        }
        if (this.radioComponent) {
            this.radioComponent.readonly = value;
        }
        if (this.dropDownComponent) {
            this.dropDownComponent.readonly = value;
        }
    }

    @Input()
    @HostBinding('class.inline')
    public get inline(): boolean {
        return this.isInline;
    }

    public set inline(value: BooleanLike) {
        this.isInline = this.toBoolean(value);
    }

    @Input()
    public get hideInitialError(): boolean {
        return this.hideInitialErrorValue;
    }

    public set hideInitialError(value: boolean) {
        this.hideInitialErrorValue = value;
    }

    @Input()
    @HostBinding('class.fill')
    public get fill(): boolean {
        return this.isFill;
    }

    public set fill(value: BooleanLike) {
        this.isFill = this.toBoolean(value);
    }

    @Input()
    public get inlineValidation(): boolean {
        return this.isInlineValidation;
    }

    public set inlineValidation(value: BooleanLike) {
        this.isInlineValidation = this.toBoolean(value);
    }

    @Input()
    public get ownLabel(): boolean {
        return this.hasOwnLabel;
    }

    public set ownLabel(value: BooleanLike) {
        this.hasOwnLabel = this.toBoolean(value);
    }

    @Input()
    public get forceLabel(): boolean {
        return this.isForceLabel;
    }

    public set forceLabel(value: BooleanLike) {
        this.isForceLabel = this.toBoolean(value);
    }

    @Output()
    public readonly errorChange = new EventEmitter<boolean>();

    @Output()
    public readonly change = new EventEmitter<void>();

    public constructor() {
        super(false);
        this.classes.registerFixed('field');
        this.classes.register('size', 'disabled', 'readonly', 'inline', 'label', 'fill', 'name');
    }

    public forceValidation(): void {
        this.wasAnytimeValid = true;
        this.visibleError = this.error;
    }
}
