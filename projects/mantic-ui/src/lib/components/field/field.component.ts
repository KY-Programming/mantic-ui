import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../../base/base.component';
import { BooleanLike } from '../../models/boolean-like';
import { FieldSize, ParsableFieldSize, parseFieldSize } from '../../models/field-size';
import { FormError } from '../../models/form-error';
import { FormValidation } from '../../models/form-validation';
import { CheckboxComponent } from '../checkbox/checkbox.component';
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

@Component({
    selector: 'm-field',
    templateUrl: './field.component.html',
    styleUrls: ['./field.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IconComponent
    ],
    hostDirectives: [...BaseComponent.directives],
    providers: [...BaseComponent.providers]
})
export class FieldComponent extends BaseComponent {
    public static readonly defaults = { hintIcon: <IconType>'info circle', hintIconSize: <IconSize>undefined };
    private labelElementValue?: HTMLLabelElement;
    private inputComponentValue?: InputComponent;
    private numericInputComponentValue?: NumericInputComponent;
    private dateInputComponentValue?: DateInputComponent;
    private checkboxComponentValue?: CheckboxComponent;
    private sliderComponentValue?: SliderComponent;
    private toggleComponentValue?: ToggleComponent;
    private radioComponentValue?: RadioComponent;
    private textareaComponentValue?: TextareaComponent;
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
            this.checkboxComponentValue.label = this.label;
            this.checkboxComponentValue.readonly = this.readonly;
            this.checkboxComponentValue.disabled = this.disabled;
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
            this.sliderComponentValue.label = this.label;
            this.sliderComponentValue.readonly = this.readonly;
            this.sliderComponentValue.disabled = this.disabled;
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
            this.toggleComponentValue.label = this.label;
            this.toggleComponentValue.readonly = this.readonly;
            this.toggleComponentValue.disabled = this.disabled;
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
            this.radioComponentValue.label = this.label;
            this.radioComponentValue.readonly = this.readonly;
            this.radioComponentValue.disabled = this.disabled;
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
            // this.textareaComponentValue.label = this.label;
            this.textareaComponentValue.readonly = this.readonly;
            this.textareaComponentValue.disabled = this.disabled;
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
    }

    @Input()
    public get label(): string | undefined {
        return this.labelValue;
    }

    public set label(value: string | undefined) {
        this.labelValue = value;
        if (this.checkboxComponent) {
            this.checkboxComponent.label = value;
        }
        if (this.sliderComponent) {
            this.sliderComponent.label = value;
        }
        if (this.toggleComponent) {
            this.toggleComponent.label = value;
        }
        if (this.radioComponent) {
            this.radioComponent.label = value;
        }
        if (this.textareaComponent) {
            // this.textareaComponent.label = value;
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
        if (this.textareaComponent) {
            this.textareaComponent.readonly = value;
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
