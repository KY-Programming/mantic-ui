import { Directive, ElementRef, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { LabeledBaseComponent } from '../base/labeled-base.component';
import { InputIconPosition } from './text/input.component';
import { BooleanLike } from '../models/boolean-like';
import { IconType } from '../icon/icon-type';
import { IconSize } from '../icon/icon-size';

@Directive()
export abstract class InputBaseComponent extends LabeledBaseComponent {
    private iconPositionValue: InputIconPosition;
    private loadingValue: boolean;
    private transparentValue: boolean;
    private hasErrorValue: boolean;
    private fluidValue: boolean;
    private readonlyValue: boolean;
    private disabledValue: boolean;
    private isAutoFocused: boolean;

    protected inputElement: ElementRef<HTMLInputElement>;

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
    public icon: IconType;

    @Input()
    public iconSize: IconSize;

    @HostBinding('class.focus')
    public focused: boolean;

    @Input()
    @HostBinding('class.loading')
    public get loading(): boolean {
        return this.loadingValue;
    }

    public set loading(value: BooleanLike) {
        this.loadingValue = this.toBoolean(value);
        this.refreshInput();
    }

    @Input()
    @HostBinding('class.disabled')
    public get disabled(): boolean {
        return this.disabledValue;
    }

    public set disabled(value: BooleanLike) {
        this.disabledValue = this.toBoolean(value);
        this.refreshInput();
    }

    @Input()
    @HostBinding('class.disabled')
    public get readonly(): boolean {
        return this.readonlyValue;
    }

    public set readonly(value: BooleanLike) {
        this.readonlyValue = this.toBoolean(value);
        this.refreshInput();
    }

    @Input()
    @HostBinding('class.error')
    public get hasError(): boolean {
        return this.hasErrorValue;
    }

    public set hasError(value: BooleanLike) {
        this.hasErrorValue = this.toBoolean(value);
        this.refreshInput();
    }

    @Input()
    @HostBinding('class.transparent')
    public get transparent(): boolean {
        return this.transparentValue;
    }

    public set transparent(value: BooleanLike) {
        this.transparentValue = this.toBoolean(value);
        this.refreshInput();
    }

    @Input()
    @HostBinding('class.fluid')
    public get fluid(): boolean {
        return this.fluidValue;
    }

    public set fluid(value: BooleanLike) {
        this.fluidValue = this.toBoolean(value);
        this.refreshInput();
    }

    @Input()
    public get autofocus(): boolean {
        return this.isAutoFocused;
    }

    public set autofocus(value: BooleanLike) {
        this.isAutoFocused = this.toBoolean(value);
        this.refreshFocus();
    }

    @HostBinding('class.color')
    public isColor: boolean;

    @HostBinding('class.input')
    public readonly input = true;

    @Input()
    public placeholder: string | undefined;

    @Input()
    public name: string | undefined;

    @Input()
    public for: string | undefined;

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

    protected constructor() {
        super();
        this.classList.register('icon', 'focused', 'loading', 'disabled', 'readonly', 'transparent', 'fluid', 'hasError', 'autofocus', 'placeholder', 'type', 'iconPosition');
    }

    protected refreshInput(): void {
        if (!this.inputElement) {
            return;
        }
        this.inputElement.nativeElement.disabled = this.disabledValue;
        this.inputElement.nativeElement.readOnly = this.readonlyValue;
    }

    protected bindEvents(): void {
        if (!this.inputElement) {
            return;
        }
        this.inputElement.nativeElement.addEventListener('keydown', event => this.keyDown.emit(event));
        this.inputElement.nativeElement.addEventListener('keyup', event => this.keyUp.emit(event));
        this.inputElement.nativeElement.addEventListener('keyPress', event => this.keyPress.emit(event));
        this.inputElement.nativeElement.addEventListener('blur', event => this.blur.emit(event));
        // this.inputElement.nativeElement.addEventListener('focus', event => this.focus.emit(event));
    }

    protected refreshFocus(): void {
        if (this.isAutoFocused && this.inputElement) {
            setTimeout(() => this.focus());
        }
    }

    public focus(): void {
        this.inputElement?.nativeElement.focus();
    }
}
