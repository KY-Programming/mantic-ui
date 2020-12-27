import { Component, ContentChild, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { LabeledBaseComponent } from '../base/labeled-base.component';

export declare type InputIconPosition =
    'left'
    | 'right';

@Component({
    selector: 'm-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent extends LabeledBaseComponent {
    private inputElement: HTMLInputElement;
    private readonlyValue: boolean;
    private disabledValue: boolean;
    private iconPositionValue: InputIconPosition;
    private loadingValue: boolean;
    private transparentValue: boolean;
    private fluidValue: boolean;
    private hasErrorValue: boolean;

    @ContentChild('input')
    public set contentInputElement(input: HTMLInputElement) {
        this.inputElement = input;
        this.refreshInput();
        this.bindEvents();
    }

    @ViewChild('input')
    public set viewInputElement(input: HTMLInputElement) {
        this.inputElement = input;
        this.bindEvents();
    }

    public get iconPosition(): InputIconPosition {
        return this.iconPositionValue;
    }

    @Input()
    public set iconPosition(value: InputIconPosition) {
        this.iconPositionValue = value;
        this.classList.set('iconPosition', value);
        this.refreshClasses();
    }

    @Input()
    @HostBinding('class.icon')
    public icon: string;

    @HostBinding('class.focus')
    public focused: boolean;

    public get loading(): boolean | string {
        return this.loadingValue;
    }

    @Input()
    @HostBinding('class.loading')
    public set loading(value: boolean | string) {
        this.loadingValue = this.toBoolean(value);
        this.refreshInput();
    }

    public get disabled(): boolean | string {
        return this.disabledValue;
    }

    @Input()
    @HostBinding('class.disabled')
    public set disabled(value: boolean | string) {
        this.disabledValue = this.toBoolean(value);
        this.refreshInput();
    }

    public get readonly(): boolean | string {
        return this.readonlyValue;
    }

    @Input()
    @HostBinding('class.readonly')
    public set readonly(value: boolean | string) {
        this.readonlyValue = this.toBoolean(value);
        this.refreshInput();
    }

    public get hasError(): boolean | string {
        return this.hasErrorValue;
    }

    @Input()
    @HostBinding('class.error')
    public set hasError(value: boolean | string) {
        this.hasErrorValue = this.toBoolean(value);
        this.refreshInput();
    }

    public get transparent(): boolean | string {
        return this.transparentValue;
    }

    @Input()
    @HostBinding('class.transparent')
    public set transparent(value: boolean | string) {
        this.transparentValue = this.toBoolean(value);
        this.refreshInput();
    }

    @Input()
    public type: string;

    @Input()
    public placeholder: string;

    @Input()
    public value: string;

    public get numericValue(): number {
        return parseInt(this.value);
    }

    @Input()
    public set numericValue(value: number) {
        this.value = value === undefined ? undefined : value.toString();
    }

    public get dateValue(): Date {
        return new Date(this.value);
    }

    @Input()
    public set dateValue(value: Date) {
        // this.value = value === undefined ? undefined : value.toISOString().replace('T', ' ').replace('Z', '');
        this.value = value === undefined ? undefined : value.toISOString().split('T')[0];
    }

    public get fluid(): boolean | string {
        return this.fluidValue;
    }

    @Input()
    @HostBinding('class.fluid')
    public set fluid(value: boolean | string) {
        this.fluidValue = this.toBoolean(value);
        this.refreshInput();
    }

    @Input()
    public min: number;

    @Input()
    public max: number;

    @Input()
    public name: string;

    @Input()
    public for: string;

    @Input()
    public maxlength: number;

    @Output()
    public readonly valueChange = new EventEmitter<string>();

    @Output()
    public readonly numericValueChange = new EventEmitter<number>();

    @Output()
    public readonly dateValueChange = new EventEmitter<Date>();

    @Output()
    public readonly keyDown = new EventEmitter<KeyboardEvent>();

    @Output()
    public readonly keyUp = new EventEmitter<KeyboardEvent>();

    @Output()
    public readonly keyPress = new EventEmitter<Event>();

    @HostBinding('class.input')
    public readonly input = true;

    public constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList.register('icon', 'focused', 'loading', 'disabled', 'readonly', 'transparent', 'fluid', 'hasError');
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
        this.inputElement.disabled = this.disabledValue;
        this.inputElement.readOnly = this.readonlyValue;
    }

    private bindEvents(): void {
        if (!this.inputElement) {
            return;
        }
        this.inputElement.addEventListener('keydown', event => this.keyDown.emit(event));
        this.inputElement.addEventListener('keyup', event => this.keyUp.emit(event));
        this.inputElement.addEventListener('keyPress', event => this.keyPress.emit(event));
    }
}
