import { Component, ContentChild, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { LabeledBaseComponent } from '../base/labeled-base.component';

export declare type InputIconPosition =
    'left'
    | 'right';

export declare type InputType = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'urlweek';

@Component({
    selector: 'm-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent extends LabeledBaseComponent {
    public inputElement: ElementRef<HTMLInputElement>;
    private readonlyValue: boolean;
    private disabledValue: boolean;
    private iconPositionValue: InputIconPosition;
    private loadingValue: boolean;
    private transparentValue: boolean;
    private fluidValue: boolean;
    private hasErrorValue: boolean;
    private isAutoFocused: boolean;
    private typeValue: InputType;

    @ContentChild('input')
    public set contentInputElement(input: ElementRef<HTMLInputElement>) {
        this.inputElement = input;
        this.refreshInput();
        this.bindEvents();
        this.refreshFocus();
    }

    @ViewChild('input')
    public set viewInputElement(input: ElementRef<HTMLInputElement>) {
        this.inputElement = input;
        this.bindEvents();
        this.refreshFocus();
    }

    public get iconPosition(): InputIconPosition {
        return this.iconPositionValue;
    }

    @Input()
    public set iconPosition(value: InputIconPosition) {
        this.iconPositionValue = value;
        this.classList.set('iconPosition', value);
    }

    @Input()
    @HostBinding('class.icon')
    public icon: string | undefined;

    @HostBinding('class.focus')
    public focused: boolean;

    public get loading(): boolean {
        return this.loadingValue;
    }

    @Input()
    @HostBinding('class.loading')
    public set loading(value: boolean | string) {
        this.loadingValue = this.toBoolean(value);
        this.refreshInput();
    }

    public get disabled(): boolean {
        return this.disabledValue;
    }

    @Input()
    @HostBinding('class.disabled')
    public set disabled(value: boolean | string) {
        this.disabledValue = this.toBoolean(value);
        this.refreshInput();
    }

    public get readonly(): boolean {
        return this.readonlyValue;
    }

    @Input()
    @HostBinding('class.disabled')
    public set readonly(value: boolean | string) {
        this.readonlyValue = this.toBoolean(value);
        this.refreshInput();
    }

    public get hasError(): boolean {
        return this.hasErrorValue;
    }

    @Input()
    @HostBinding('class.error')
    public set hasError(value: boolean | string) {
        this.hasErrorValue = this.toBoolean(value);
        this.refreshInput();
    }

    public get transparent(): boolean {
        return this.transparentValue;
    }

    @Input()
    @HostBinding('class.transparent')
    public set transparent(value: boolean | string) {
        this.transparentValue = this.toBoolean(value);
        this.refreshInput();
    }

    @HostBinding('class.color')
    public isColor: boolean;

    @Input()
    public get type(): InputType {
        return this.typeValue;
    }

    public set type(value: InputType) {
        this.typeValue = value;
        this.isColor = value === 'color';
        if (this.isColor) {
            this.label = { position: 'right' };
        }
    }

    @Input()
    public placeholder: string | undefined;

    @Input()
    public value: string | undefined;

    public get numericValue(): number | undefined {
        return parseInt(this.value, 10);
    }

    @Input()
    public set numericValue(value: number | undefined) {
        this.value = value === undefined ? undefined : value.toString();
    }

    public get dateValue(): Date | undefined {
        return this.value ? new Date(this.value) : undefined;
    }

    @Input()
    public set dateValue(value: Date | undefined) {
        // this.value = value === undefined ? undefined : value.toISOString().replace('T', ' ').replace('Z', '');
        this.value = value === undefined ? undefined : value.toISOString().split('T')[0];
    }

    public get fluid(): boolean {
        return this.fluidValue;
    }

    @Input()
    @HostBinding('class.fluid')
    public set fluid(value: boolean | string) {
        this.fluidValue = this.toBoolean(value);
        this.refreshInput();
    }

    @Input()
    public set autofocus(value: boolean | string) {
        this.isAutoFocused = this.toBoolean(value);
        this.refreshFocus();
    }

    @Input()
    public min: number | undefined;

    @Input()
    public max: number | undefined;

    @Input()
    public name: string | undefined;

    @Input()
    public for: string | undefined;

    @Input()
    public maxlength: number | undefined;

    @Output()
    public readonly valueChange = new EventEmitter<string | undefined>();

    @Output()
    public readonly numericValueChange = new EventEmitter<number | undefined>();

    @Output()
    public readonly dateValueChange = new EventEmitter<Date | undefined>();

    @Output()
    public readonly keyDown = new EventEmitter<KeyboardEvent>();

    @Output()
    public readonly keyUp = new EventEmitter<KeyboardEvent>();

    @Output()
    public readonly keyPress = new EventEmitter<Event>();

    @Output()
    public readonly blur = new EventEmitter<FocusEvent>();

    // @Output()
    // public readonly focus = new EventEmitter<FocusEvent>();

    @HostBinding('class.input')
    public readonly input = true;

    public constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList.register('icon', 'focused', 'loading', 'disabled', 'readonly', 'transparent', 'fluid', 'hasError', 'autofocus', 'placeholder', 'type');
    }

    private refreshFocus(): void {
        if (this.isAutoFocused && this.inputElement) {
            setTimeout(() => this.focus());
        }
    }

    public onChange(): void {
        this.valueChange.emit(this.value);
        this.numericValueChange.emit(this.numericValue);
        this.dateValueChange.emit(this.dateValue);
    }

    private refreshInput(): void {
        if (!this.inputElement) {
            return;
        }
        this.inputElement.nativeElement.disabled = this.disabledValue;
        this.inputElement.nativeElement.readOnly = this.readonlyValue;
    }

    private bindEvents(): void {
        if (!this.inputElement) {
            return;
        }
        this.inputElement.nativeElement.addEventListener('keydown', event => this.keyDown.emit(event));
        this.inputElement.nativeElement.addEventListener('keyup', event => this.keyUp.emit(event));
        this.inputElement.nativeElement.addEventListener('keyPress', event => this.keyPress.emit(event));
        this.inputElement.nativeElement.addEventListener('blur', event => this.blur.emit(event));
        // this.inputElement.nativeElement.addEventListener('focus', event => this.focus.emit(event));
    }

    public focus(): void {
        this.inputElement.nativeElement.focus();
    }
}
