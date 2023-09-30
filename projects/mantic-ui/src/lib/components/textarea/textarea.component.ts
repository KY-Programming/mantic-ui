import { ApplicationRef, Component, ContentChild, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InvertibleComponent } from '../../base/invertible.component';
import { FallbackForDirective } from '../../directives/fallback-for.directive';
import { BooleanLike } from '../../models/boolean-like';

@Component({
    selector: 'm-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        FallbackForDirective
    ],
    hostDirectives: [...InvertibleComponent.directives],
    providers: [...InvertibleComponent.providers]
})
export class TextareaComponent extends InvertibleComponent {
    public static readonly defaults = {
        inverted: false,
        invertedChange: new ReplaySubject<boolean>(1)
    };

    private readonlyValue = false;
    private disabledValue = false;

    public textareaElement?: ElementRef<HTMLTextAreaElement>;

    @Input()
    public name?: string;

    @Input()
    @HostBinding('class.disabled')
    public get disabled(): boolean {
        return this.disabledValue;
    }

    public set disabled(value: BooleanLike) {
        this.disabledValue = this.toBoolean(value);
        this.refreshTextarea();
    }

    @Input()
    @HostBinding('class.disabled')
    public get readonly(): boolean {
        return this.readonlyValue;
    }

    public set readonly(value: BooleanLike) {
        this.readonlyValue = this.toBoolean(value);
        this.refreshTextarea();
    }

    @Input()
    @HostBinding('class.error')
    public hasError = false;

    @Input()
    public placeholder: string | undefined;

    @Input()
    public value: string | undefined;

    @Input()
    public get text(): string {
        return this.value ?? this.default;
    }

    public set text(value: string | undefined) {
        this.value = value;
    }

    @Input()
    public default = '';

    @Input()
    public inputId: string | undefined;

    @Output()
    public readonly valueChange = new EventEmitter<string | undefined>();

    @Output()
    public readonly textChange = new EventEmitter<string>();

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
        this.classes.register('disabled', 'readonly', 'hasError', 'fluid', 'value', 'text', 'default', 'placeholder')
            // HACK: Currently I do not know a other way to style a textarea with semantic ui, so I have to use form class here
            .registerFixed('form', 'textarea');
        TextareaComponent.defaults.invertedChange.pipe(takeUntil(this.destroy)).subscribe(value => this.refreshInverted(value));
    }

    protected onChange(): void {
        this.value ??= this.default;
        this.valueChange.emit(this.value);
        this.textChange.emit(this.text);
    }

    private refreshTextarea(): void {
        if (!this.textareaElement) {
            return;
        }
        this.textareaElement.nativeElement.disabled = this.disabledValue;
        this.textareaElement.nativeElement.readOnly = this.readonlyValue;
    }

    private readonly keyDownEventHandler = (event: KeyboardEvent) => this.keyDown.next(event);
    private readonly keyUpEventHandler = (event: KeyboardEvent) => this.keyUp.next(event);
    private readonly keyPressEventHandler = (event: Event) => this.keyPress.next(event);
    private readonly blurEventHandler = (event: FocusEvent) => this.blur.next(event);
    private readonly focusEventHandler = (event: FocusEvent) => this.focus.next(event);
    private readonly focusinEventHandler = (event: FocusEvent) => this.focusin.next(event);
    private readonly focusoutEventHandler = (event: FocusEvent) => this.focusout.next(event);

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
