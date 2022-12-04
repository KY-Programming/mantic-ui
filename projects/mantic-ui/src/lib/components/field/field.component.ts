import { Component, ContentChild, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { InputComponent } from '../input/text/input.component';
import { FieldSize, ParsableFieldSize, parseFieldSize } from '../../models/field-size';
import { FormError } from '../../models/form-error';
import { FormValidation } from '../../models/form-validation';
import { RadioComponent } from '../radio/radio.component';
import { SliderComponent } from '../slider/slider.component';
import { TextareaComponent } from '../textarea/textarea.component';
import { ToggleComponent } from '../toggle/toggle.component';
import { BaseComponent } from '../../base/base.component';
import { NumericInputComponent } from '../input/numeric/numeric-input.component';
import { DateInputComponent } from '../input/date/date-input.component';
import { BooleanLike } from '../../models/boolean-like';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'm-field',
    templateUrl: './field.component.html',
    styleUrls: ['./field.component.scss'],
    standalone: true,
    imports: [
        CommonModule
    ],
    hostDirectives: [...BaseComponent.directives],
    providers: [...BaseComponent.providers]
})
export class FieldComponent extends BaseComponent {
    private labelElementValue: HTMLLabelElement;
    private inputComponentValue: InputComponent;
    private numericInputComponentValue: NumericInputComponent;
    private dateInputComponentValue: DateInputComponent;
    private checkboxComponentValue: CheckboxComponent;
    private sliderComponentValue: SliderComponent;
    private toggleComponentValue: ToggleComponent;
    private radioComponentValue: RadioComponent;
    private textareaComponentValue: TextareaComponent;
    private nameValue: string;
    private labelValue: string;
    private sizeValue: FieldSize;
    private disabledValue: boolean;
    private readonlyValue: boolean;
    private errorValue: boolean;
    private hideInitialErrorValue = true;
    private isInline: boolean;
    private isFill: boolean;

    public wasAnytimeValid = false;
    public readonly errors: FormError[] = [];

    @ContentChild('labelElement')
    protected get labelElement(): HTMLLabelElement {
        return this.labelElementValue;
    }

    protected set labelElement(value: HTMLLabelElement) {
        this.labelElementValue = value;
        if (this.labelElementValue) {
            this.labelElementValue.setAttribute('for', this.name);
        }
    }

    @ContentChild(InputComponent)
    protected get inputComponent(): InputComponent {
        return this.inputComponentValue;
    }

    protected set inputComponent(value: InputComponent) {
        this.inputComponentValue = value;
        if (this.inputComponentValue) {
            this.inputComponentValue.for = this.name;
            this.inputComponentValue.name = this.name;
            this.inputComponentValue.readonly = this.readonly;
            this.inputComponentValue.disabled = this.disabled;
        }
    }

    @ContentChild(NumericInputComponent)
    protected get numericInputComponent(): NumericInputComponent {
        return this.numericInputComponentValue;
    }

    protected set numericInputComponent(value: NumericInputComponent) {
        this.numericInputComponentValue = value;
        if (this.numericInputComponentValue) {
            this.numericInputComponentValue.for = this.name;
            this.numericInputComponentValue.name = this.name;
            this.numericInputComponentValue.readonly = this.readonly;
            this.numericInputComponentValue.disabled = this.disabled;
        }
    }

    @ContentChild(DateInputComponent)
    protected get dateInputComponent(): DateInputComponent {
        return this.dateInputComponentValue;
    }

    protected set dateInputComponent(value: DateInputComponent) {
        this.dateInputComponentValue = value;
        if (this.dateInputComponentValue) {
            this.dateInputComponentValue.for = this.name;
            this.dateInputComponentValue.name = this.name;
            this.dateInputComponentValue.readonly = this.readonly;
            this.dateInputComponentValue.disabled = this.disabled;
        }
    }

    @ContentChild(CheckboxComponent)
    protected get checkboxComponent(): CheckboxComponent {
        return this.checkboxComponentValue;
    }

    protected set checkboxComponent(value: CheckboxComponent) {
        this.checkboxComponentValue = value;
        if (this.checkboxComponentValue) {
            this.checkboxComponentValue.name = this.name;
            this.checkboxComponentValue.label = this.label;
            this.checkboxComponentValue.readonly = this.readonly;
            this.checkboxComponentValue.disabled = this.disabled;
        }
    }

    @ContentChild(SliderComponent)
    protected get sliderComponent(): SliderComponent {
        return this.sliderComponentValue;
    }

    protected set sliderComponent(value: SliderComponent) {
        this.sliderComponentValue = value;
        if (this.sliderComponentValue) {
            this.sliderComponentValue.name = this.name;
            this.sliderComponentValue.label = this.label;
            this.sliderComponentValue.readonly = this.readonly;
            this.sliderComponentValue.disabled = this.disabled;
        }
    }

    @ContentChild(ToggleComponent)
    protected get toggleComponent(): ToggleComponent {
        return this.toggleComponentValue;
    }

    protected set toggleComponent(value: ToggleComponent) {
        this.toggleComponentValue = value;
        if (this.toggleComponentValue) {
            this.toggleComponentValue.name = this.name;
            this.toggleComponentValue.label = this.label;
            this.toggleComponentValue.readonly = this.readonly;
            this.toggleComponentValue.disabled = this.disabled;
        }
    }

    @ContentChild(RadioComponent)
    protected get radioComponent(): RadioComponent {
        return this.radioComponentValue;
    }

    protected set radioComponent(value: RadioComponent) {
        this.radioComponentValue = value;
        if (this.radioComponentValue) {
            this.radioComponentValue.name = this.name;
            this.radioComponentValue.label = this.label;
            this.radioComponentValue.readonly = this.readonly;
            this.radioComponentValue.disabled = this.disabled;
        }
    }

    @ContentChild(TextareaComponent)
    protected get textareaComponent(): TextareaComponent {
        return this.textareaComponentValue;
    }

    protected set textareaComponent(value: TextareaComponent) {
        this.textareaComponentValue = value;
        if (this.textareaComponentValue) {
            this.textareaComponentValue.name = this.name;
            // this.textareaComponentValue.label = this.label;
            this.textareaComponentValue.readonly = this.readonly;
            this.textareaComponentValue.disabled = this.disabled;
        }
    }

    @Input()
    public get name(): string {
        return this.nameValue;
    }

    public set name(value: string) {
        this.nameValue = value;
        if (this.labelElement) {
            this.labelElement.setAttribute('for', value);
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
    public get label(): string {
        return this.labelValue;
    }

    public set label(value: string) {
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
    @HostBinding('class.wide')
    public get size(): FieldSize {
        return this.sizeValue;
    }

    public set size(value: ParsableFieldSize) {
        this.sizeValue = parseFieldSize(value);
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
    protected visibleError: boolean;

    @Input()
    public set valid(value: boolean | FormValidation) {
        const oldError = this.error;
        const newError = typeof value === 'boolean' ? !value : value && !value.valid;
        this.errors.length = 0;
        if (newError) {
            const message = typeof value === 'boolean' ? '' : value.message;
            const label = typeof value === 'boolean' ? this.label : value.label === undefined ? this.label : value.label;
            this.errors.push({ message, label });
        }
        if (newError !== oldError) {
            this.error = newError;
            this.refreshClasses();
        }
        if (!this.error) {
            this.wasAnytimeValid = true;
        } else if (this.hideInitialError && !this.wasAnytimeValid) {
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
