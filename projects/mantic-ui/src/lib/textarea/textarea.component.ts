import { ApplicationRef, Component, ContentChild, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { BooleanLike } from '../models/boolean-like';
import { InvertibleComponent } from '../base/invertible.component';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
    selector: 'm-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent extends InvertibleComponent {
    public static readonly defaults = {
        inverted: false,
        invertedChange: new ReplaySubject<boolean>(1)
    };

    private readonlyValue: boolean;
    private disabledValue: boolean;

    public textareaElement: ElementRef<HTMLTextAreaElement>;

    @Input()
    public name: string;

    public get disabled(): boolean {
        return this.disabledValue;
    }

    @Input()
    @HostBinding('class.disabled')
    public set disabled(value: BooleanLike) {
        this.disabledValue = this.toBoolean(value);
        this.refreshTextarea();
    }

    public get readonly(): boolean {
        return this.readonlyValue;
    }

    @Input()
    @HostBinding('class.disabled')
    public set readonly(value: BooleanLike) {
        this.readonlyValue = this.toBoolean(value);
        this.refreshTextarea();
    }

    @Input()
    @HostBinding('class.error')
    public hasError: boolean;

    @Input()
    public placeholder: string | undefined;

    @Input()
    public value: string | undefined;

    @Input()
    public defaultValue: string | undefined;

    @Output()
    public readonly valueChange = new EventEmitter<string | undefined>();

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

    @HostBinding('class.textarea')
    // HACK: Currently I do not know a other way to style a textarea with semantic ui
    @HostBinding('class.form')
    public readonly textarea = true;

    @ContentChild('textarea')
    protected set contentTextareaElement(textarea: ElementRef<HTMLTextAreaElement>) {
        this.unbindEvents();
        this.textareaElement = textarea;
        this.refreshTextarea();
        this.bindEvents();
    }

    @ViewChild('textarea')
    protected set viewInputElement(textarea: ElementRef<HTMLTextAreaElement>) {
        this.unbindEvents();
        this.textareaElement = textarea;
        this.bindEvents();
    }

    public constructor(
        private readonly applicationRef: ApplicationRef
    ) {
        super();
        this.classList.register('disabled', 'readonly', 'hasError', 'fluid');
        TextareaComponent.defaults.invertedChange.pipe(takeUntil(this.destroy)).subscribe(value => this.refreshInverted(value));
    }

    protected onChange(): void {
        this.value ??= this.defaultValue;
        this.valueChange.emit(this.value);
    }

    public forceChange(): void {
        const value = this.value;
        // Currently no other way available to force rebind.
        // eslint-disable-next-line no-null/no-null
        const tempValue = value === undefined ? null : this.defaultValue;
        this.valueChange.emit(tempValue);
        this.applicationRef.tick();
        this.valueChange.emit(value);
    }

    private refreshTextarea(): void {
        if (!this.textareaElement) {
            return;
        }
        this.textareaElement.nativeElement.disabled = this.disabledValue;
        this.textareaElement.nativeElement.readOnly = this.readonlyValue;
    }

    private readonly keyDownEventHandler = event => this.keyDown.next(event);
    private readonly keyUpEventHandler = event => this.keyUp.next(event);
    private readonly keyPressEventHandler = event => this.keyPress.next(event);
    private readonly blurEventHandler = event => this.blur.next(event);
    private readonly focusEventHandler = event => this.focus.next(event);
    private readonly focusinEventHandler = event => this.focusin.next(event);
    private readonly focusoutEventHandler = event => this.focusout.next(event);

    protected bindEvents(): void {
        if (!this.textareaElement) {
            return;
        }
        // TODO: Improve event binding!
        this.textareaElement.nativeElement.addEventListener('keydown', this.keyDownEventHandler);
        this.textareaElement.nativeElement.addEventListener('keyup', this.keyUpEventHandler);
        this.textareaElement.nativeElement.addEventListener('keyPress', this.keyPressEventHandler);
        this.textareaElement.nativeElement.addEventListener('blur', this.blurEventHandler);
        this.textareaElement.nativeElement.addEventListener('focus', this.focusEventHandler);
        this.textareaElement.nativeElement.addEventListener('focusin', this.focusinEventHandler);
        this.textareaElement.nativeElement.addEventListener('focusout', this.focusoutEventHandler);
    }

    protected unbindEvents(): void {
        if (!this.textareaElement) {
            return;
        }
        this.textareaElement.nativeElement.removeEventListener('keydown', this.keyDownEventHandler);
        this.textareaElement.nativeElement.removeEventListener('keyup', this.keyUpEventHandler);
        this.textareaElement.nativeElement.removeEventListener('keyPress', this.keyPressEventHandler);
        this.textareaElement.nativeElement.removeEventListener('blur', this.blurEventHandler);
        this.textareaElement.nativeElement.removeEventListener('focus', this.focusEventHandler);
        this.textareaElement.nativeElement.removeEventListener('focusin', this.focusinEventHandler);
        this.textareaElement.nativeElement.removeEventListener('focusout', this.focusoutEventHandler);
    }
}
