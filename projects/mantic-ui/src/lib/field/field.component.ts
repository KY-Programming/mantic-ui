import { Component, ContentChild, ElementRef, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { InputComponent } from '../input/input.component';
import { FieldSize, fieldSizes } from '../models/field-size';
import { FormError } from '../models/form-error';
import { FormValidation } from '../models/form-validation';
import { RadioComponent } from '../radio/radio.component';
import { SliderComponent } from '../slider/slider.component';
import { TextareaComponent } from '../textarea/textarea.component';
import { ToggleComponent } from '../toggle/toggle.component';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'm-field',
    templateUrl: './field.component.html',
    styleUrls: ['./field.component.scss']
})
export class FieldComponent extends BaseComponent {
    private labelElementValue: HTMLLabelElement;
    private inputComponentValue: InputComponent;
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

    public wasAnytimeValid = false;
    public readonly errors: FormError[] = [];

    public get labelElement(): HTMLLabelElement {
        return this.labelElementValue;
    }

    @ContentChild('labelElement')
    public set labelElement(value: HTMLLabelElement) {
        this.labelElementValue = value;
        if (this.labelElementValue) {
            this.labelElementValue.setAttribute('for', this.name);
        }
    }

    public get inputComponent(): InputComponent {
        return this.inputComponentValue;
    }

    @ContentChild(InputComponent)
    public set inputComponent(value: InputComponent) {
        this.inputComponentValue = value;
        if (this.inputComponentValue) {
            this.inputComponentValue.for = this.name;
            this.inputComponentValue.name = this.name;
            this.inputComponentValue.readonly = this.readonly;
            this.inputComponentValue.disabled = this.disabled;
        }
    }

    public get checkboxComponent(): CheckboxComponent {
        return this.checkboxComponentValue;
    }

    @ContentChild(CheckboxComponent)
    public set checkboxComponent(value: CheckboxComponent) {
        this.checkboxComponentValue = value;
        if (this.checkboxComponentValue) {
            this.checkboxComponentValue.name = this.name;
            this.checkboxComponentValue.label = this.label;
            this.checkboxComponentValue.readonly = this.readonly;
            this.checkboxComponentValue.disabled = this.disabled;
        }
    }

    public get sliderComponent(): SliderComponent {
        return this.sliderComponentValue;
    }

    @ContentChild(SliderComponent)
    public set sliderComponent(value: SliderComponent) {
        this.sliderComponentValue = value;
        if (this.sliderComponentValue) {
            this.sliderComponentValue.name = this.name;
            this.sliderComponentValue.label = this.label;
            this.sliderComponentValue.readonly = this.readonly;
            this.sliderComponentValue.disabled = this.disabled;
        }
    }

    public get toggleComponent(): ToggleComponent {
        return this.toggleComponentValue;
    }

    @ContentChild(ToggleComponent)
    public set toggleComponent(value: ToggleComponent) {
        this.toggleComponentValue = value;
        if (this.toggleComponentValue) {
            this.toggleComponentValue.name = this.name;
            this.toggleComponentValue.label = this.label;
            this.toggleComponentValue.readonly = this.readonly;
            this.toggleComponentValue.disabled = this.disabled;
        }
    }

    public get radioComponent(): RadioComponent {
        return this.radioComponentValue;
    }

    @ContentChild(RadioComponent)
    public set radioComponent(value: RadioComponent) {
        this.radioComponentValue = value;
        if (this.radioComponentValue) {
            this.radioComponentValue.name = this.name;
            this.radioComponentValue.label = this.label;
            this.radioComponentValue.readonly = this.readonly;
            this.radioComponentValue.disabled = this.disabled;
        }
    }

    public get textareaComponent(): TextareaComponent {
        return this.textareaComponentValue;
    }

    @ContentChild(TextareaComponent)
    public set textareaComponent(value: TextareaComponent) {
        this.textareaComponentValue = value;
        if (this.textareaComponentValue) {
            this.textareaComponentValue.name = this.name;
            // this.textareaComponentValue.label = this.label;
            this.textareaComponentValue.readonly = this.readonly;
            this.textareaComponentValue.disabled = this.disabled;
        }
    }

    public get name(): string {
        return this.nameValue;
    }

    @Input()
    public set name(value: string) {
        this.nameValue = value;
        if (this.labelElement) {
            this.labelElement.setAttribute('for', value);
        }
        if (this.inputComponent) {
            this.inputComponent.for = value;
            this.inputComponent.name = value;
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

    public get label(): string {
        return this.labelValue;
    }

    @Input()
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

    public get size(): FieldSize {
        return this.sizeValue;
    }

    @Input()
    @HostBinding('class.wide')
    public set size(value: FieldSize) {
        const sizeNumber = value ? parseInt(value.toString()) : undefined;
        if (sizeNumber && !Number.isNaN(sizeNumber)) {
            this.sizeValue = fieldSizes[value];
        }
        else {
            this.sizeValue = value;
        }
        this.classList.set('size', value);
        this.refreshClasses();
    }

    public get error(): boolean {
        return this.errorValue;
    }

    @Input()
    public set error(value: boolean) {
        if (this.errorValue === value) {
            return;
        }
        this.errorValue = value;
        this.visibleError = value;
        this.errorChange.emit(value);
    }

    @HostBinding('class.error')
    public visibleError: boolean;

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
        }
        else if (this.hideInitialError && !this.wasAnytimeValid) {
            this.visibleError = false;
        }
    }

    public get disabled(): boolean | string {
        return this.disabledValue;
    }

    @Input()
    @HostBinding('class.disabled')
    public set disabled(value: boolean | string) {
        this.disabledValue = this.toBoolean(value);
        if (this.inputComponent) {
            this.inputComponent.disabled = value;
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

    public get readonly(): boolean | string {
        return this.readonlyValue;
    }

    @Input()
    @HostBinding('class.readonly')
    public set readonly(value: boolean | string) {
        this.readonlyValue = this.toBoolean(value);
        if (this.inputComponent) {
            this.inputComponent.readonly = value;
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
    public get inline(): boolean | string {
        return this.isInline;
    }

    public set inline(value: string | boolean) {
        this.isInline = this.toBoolean(value);
    }

    public get hideInitialError(): boolean {
        return this.hideInitialErrorValue;
    }

    @Input()
    public set hideInitialError(value: boolean) {
        this.hideInitialErrorValue = value;
    }

    @HostBinding('class.field')
    public readonly field = true;

    @Output()
    public readonly errorChange = new EventEmitter<boolean>();

    public constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef, false);
        this.classList.register('size', 'disabled', 'readonly', 'inline');
    }

    public forceValidation(): void {
        this.wasAnytimeValid = true;
        this.visibleError = this.error;
        // this.refreshClasses();
    }
}
