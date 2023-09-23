import { Directive, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, Output } from '@angular/core';
import { LabeledBaseComponent } from '../../base/labeled-base.component';
import { InputIconPosition } from './text/input.component';
import { BooleanLike } from '../../models/boolean-like';
import { IconType } from '../icon/icon-type';
import { IconSize } from '../icon/icon-size';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoadingDirective } from '../../directives/loading.directive';
import { FluidDirective } from '../../directives/fluid.directive';

@Directive()
export abstract class InputBaseComponent extends LabeledBaseComponent implements OnDestroy {
    public static readonly defaults = {
        inverted: false,
        invertedChange: new ReplaySubject<boolean>(1)
    };
    protected static override readonly providers = [...LabeledBaseComponent.providers];
    protected static override readonly directives = [...LabeledBaseComponent.directives, LoadingDirective.default, FluidDirective.default];

    private iconPositionValue: InputIconPosition | undefined;
    private transparentValue = false;
    private hasErrorValue = false;
    private readonlyValue = false;
    private disabledValue = false;
    private isAutoFocused = false;

    public inputElement: ElementRef<HTMLInputElement> | undefined;

    public get iconPosition(): InputIconPosition | undefined {
        return this.iconPositionValue;
    }

    @Input()
    public set iconPosition(value: InputIconPosition | undefined) {
        this.iconPositionValue = value;
        this.classes.set('iconPosition', value);
    }

    @Input()
    @HostBinding('class.icon')
    public icon: IconType | undefined;

    @Input()
    public iconSize: IconSize;

    @HostBinding('class.focus')
    public focused = false;

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
    @HostBinding('class.readonly')
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
    }

    @Input()
    @HostBinding('class.transparent')
    public get transparent(): boolean {
        return this.transparentValue;
    }

    public set transparent(value: BooleanLike) {
        this.transparentValue = this.toBoolean(value);
    }

    @Input()
    public get autofocus(): boolean {
        return this.isAutoFocused;
    }

    public set autofocus(value: BooleanLike) {
        this.isAutoFocused = this.toBoolean(value);
        this.refreshFocus();
    }

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

    @HostBinding('class.color')
    protected isColor = false;

    protected constructor() {
        super();
        InputBaseComponent.defaults.invertedChange.pipe(takeUntil(this.destroy)).subscribe(value => this.refreshInverted(value));
        this.classes.registerFixed('input');
        this.classes.register('icon', 'focused', 'disabled', 'readonly', 'transparent', 'hasError', 'autofocus', 'placeholder', 'iconPosition');
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

    private readonly keyDownEventHandler = (event: KeyboardEvent) => this.keyDown.next(event);
    private readonly keyUpEventHandler = (event: KeyboardEvent) => this.keyUp.next(event);
    private readonly keyPressEventHandler = (event: Event) => this.keyPress.next(event);
    private readonly blurEventHandler = (event: FocusEvent) => this.blur.next(event);
    private readonly focusEventHandler = (event: FocusEvent) => this.focus.next(event);
    private readonly focusinEventHandler = (event: FocusEvent) => this.focusin.next(event);
    private readonly focusoutEventHandler = (event: FocusEvent) => this.focusout.next(event);

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
