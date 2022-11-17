import { Directive, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, Output } from '@angular/core';
import { LabeledBaseComponent } from '../base/labeled-base.component';
import { InputIconPosition } from './text/input.component';
import { BooleanLike } from '../models/boolean-like';
import { IconType } from '../icon/icon-type';
import { IconSize } from '../icon/icon-size';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive()
export abstract class InputBaseComponent extends LabeledBaseComponent implements OnDestroy {
    public static readonly defaults = {
        inverted: false,
        invertedChange: new ReplaySubject<boolean>(1)
    };

    private iconPositionValue: InputIconPosition;
    private loadingValue: boolean;
    private transparentValue: boolean;
    private hasErrorValue: boolean;
    private fluidValue: boolean;
    private readonlyValue: boolean;
    private disabledValue: boolean;
    private isAutoFocused: boolean;

    public inputElement: ElementRef<HTMLInputElement>;

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

    @Output()
    public readonly focus = new EventEmitter<FocusEvent>();

    @Output()
    public readonly focusin = new EventEmitter<FocusEvent>();

    @Output()
    public readonly focusout = new EventEmitter<FocusEvent>();

    protected constructor() {
        super();
        InputBaseComponent.defaults.invertedChange.pipe(takeUntil(this.destroy)).subscribe(value => this.refreshInverted(value));
        this.classList.register('icon', 'focused', 'loading', 'disabled', 'readonly', 'transparent', 'fluid', 'hasError', 'autofocus', 'placeholder', 'type', 'iconPosition');
    }

    public override ngOnDestroy(): void {
        super.ngOnDestroy();
        this.unbindEvents();
    }

    protected refreshInput(): void {
        if (!this.inputElement) {
            return;
        }
        this.inputElement.nativeElement.disabled = this.disabledValue;
        this.inputElement.nativeElement.readOnly = this.readonlyValue;
    }

    private readonly keyDownEventHandler = event => this.keyDown.next(event);
    private readonly keyUpEventHandler = event => this.keyUp.next(event);
    private readonly keyPressEventHandler = event => this.keyPress.next(event);
    private readonly blurEventHandler = event => this.blur.next(event);
    private readonly focusEventHandler = event => this.focus.next(event);
    private readonly focusinEventHandler = event => this.focusin.next(event);
    private readonly focusoutEventHandler = event => this.focusout.next(event);

    protected bindEvents(): void {
        if (!this.inputElement) {
            return;
        }
        // TODO: Improve event binding!
        this.inputElement.nativeElement.addEventListener('keydown', this.keyDownEventHandler);
        this.inputElement.nativeElement.addEventListener('keyup', this.keyUpEventHandler);
        this.inputElement.nativeElement.addEventListener('keyPress', this.keyPressEventHandler);
        this.inputElement.nativeElement.addEventListener('blur', this.blurEventHandler);
        this.inputElement.nativeElement.addEventListener('focus', this.focusEventHandler);
        this.inputElement.nativeElement.addEventListener('focusin', this.focusinEventHandler);
        this.inputElement.nativeElement.addEventListener('focusout', this.focusoutEventHandler);
    }

    protected unbindEvents(): void {
        if (!this.inputElement) {
            return;
        }
        this.inputElement.nativeElement.removeEventListener('keydown', this.keyDownEventHandler);
        this.inputElement.nativeElement.removeEventListener('keyup', this.keyUpEventHandler);
        this.inputElement.nativeElement.removeEventListener('keyPress', this.keyPressEventHandler);
        this.inputElement.nativeElement.removeEventListener('blur', this.blurEventHandler);
        this.inputElement.nativeElement.removeEventListener('focus', this.focusEventHandler);
        this.inputElement.nativeElement.removeEventListener('focusin', this.focusinEventHandler);
        this.inputElement.nativeElement.removeEventListener('focusout', this.focusoutEventHandler);
    }

    protected refreshFocus(): void {
        if (this.isAutoFocused && this.inputElement) {
            setTimeout(() => this.setFocus());
        }
    }

    public setFocus(): void {
        this.inputElement?.nativeElement.focus();
    }
}
