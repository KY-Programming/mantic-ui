import { Component, computed, ContentChild, effect, ElementRef, input, model, output, signal, untracked, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvertibleComponent } from '../../base/invertible.component';
import { FallbackForDirective } from '../../directives/fallback-for.directive';
import { toBoolean } from '../../helpers/to-boolean';
import { transformableModel } from '../../helpers/transformable-model';
import { BooleanLike } from '../../models/boolean-like';

@Component({
    selector: 'm-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss'],
    imports: [FormsModule, FallbackForDirective],
    providers: [...InvertibleComponent.providers],
    host: {
        '[class.disabled]': 'disabled() || readonly()',
        '[class.error]': 'hasError()'
    }
})
export class TextareaComponent extends InvertibleComponent {
    public static readonly defaults = {
        inverted: signal(false)
    };
    protected readonly valueState = signal<string | undefined>(undefined);
    public textareaElement?: ElementRef<HTMLTextAreaElement>;
    public readonly name = model<string>();
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly disabledInput = input<boolean, BooleanLike>(false, { alias: 'disabled', transform: toBoolean });
    public readonly disabledChange = output<boolean>();
    public readonly disabled = transformableModel(this.disabledInput, this.disabledChange, toBoolean);
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly readonlyInput = input<boolean, BooleanLike>(false, { alias: 'readonly', transform: toBoolean });
    public readonly readonlyChange = output<boolean>();
    public readonly readonly = transformableModel(this.readonlyInput, this.readonlyChange, toBoolean);
    public readonly hasError = input(false);
    public readonly placeholder = input<string>();
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly valueInput = input<string | undefined>(undefined, { alias: 'value' });
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly textInput = input<string | undefined>(undefined, { alias: 'text' });
    public readonly default = input('');
    public readonly inputId = input<string>();
    public readonly value = computed(() => this.valueState());
    public readonly text = computed(() => this.valueState() ?? this.default());
    public readonly valueChange = output<string | undefined>();
    public readonly textChange = output<string>();
    public readonly keyDown = output<KeyboardEvent>();
    public readonly keyUp = output<KeyboardEvent>();
    public readonly keyPress = output<Event>();
    // eslint-disable-next-line @angular-eslint/no-output-native
    public readonly blur = output<FocusEvent>();
    // eslint-disable-next-line @angular-eslint/no-output-native
    public readonly focus = output<FocusEvent>();
    // eslint-disable-next-line @angular-eslint/no-output-native
    public readonly focusin = output<FocusEvent>();
    // eslint-disable-next-line @angular-eslint/no-output-native
    public readonly focusout = output<FocusEvent>();

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

    public constructor() {
        super();
        this.classes.register('disabled', 'readonly', 'hasError', 'fluid', 'value', 'text', 'default', 'placeholder')
            // HACK: Currently I do not know a other way to style a textarea with semantic ui, so I have to use form class here
            .registerFixed('form', 'textarea');
        effect(() => this.refreshInverted(TextareaComponent.defaults.inverted()));
        // Push disabled/readonly onto the native element whenever they change.
        effect(() => {
            this.disabled();
            this.readonly();
            this.refreshTextarea();
        });
        // [value] flows into the shared state; [text] is guarded so an unbound alias can't clobber [value].
        effect(() => {
            const value = this.valueInput();
            untracked(() => this.valueState.set(value));
        });
        effect(() => {
            const value = this.textInput();
            untracked(() => {
                if (value !== undefined) {
                    this.valueState.set(value);
                }
            });
        });
    }

    protected setValue(value: string | undefined): void {
        this.valueState.set(value);
        this.onChange();
    }

    protected onChange(): void {
        this.valueChange.emit(this.value() ?? this.default());
        this.textChange.emit(this.text());
    }

    private refreshTextarea(): void {
        if (!this.textareaElement) {
            return;
        }
        this.textareaElement.nativeElement.disabled = this.disabled();
        this.textareaElement.nativeElement.readOnly = this.readonly();
    }

    private readonly keyDownEventHandler = (event: KeyboardEvent): void => this.keyDown.emit(event);
    private readonly keyUpEventHandler = (event: KeyboardEvent): void => this.keyUp.emit(event);
    private readonly keyPressEventHandler = (event: Event): void => this.keyPress.emit(event);
    private readonly blurEventHandler = (event: FocusEvent): void => this.blur.emit(event);
    private readonly focusEventHandler = (event: FocusEvent): void => this.focus.emit(event);
    private readonly focusinEventHandler = (event: FocusEvent): void => this.focusin.emit(event);
    private readonly focusoutEventHandler = (event: FocusEvent): void => this.focusout.emit(event);

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
