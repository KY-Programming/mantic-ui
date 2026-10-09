import { computed, contentChild, Directive, effect, ElementRef, input, model, output, signal, viewChild } from '@angular/core';
import { LabeledBaseComponent } from '../../base/labeled-base.component';
import { toBoolean } from '../../helpers/to-boolean';
import { transformableModel } from '../../helpers/transformable-model';
import { BooleanLike } from '../../models/boolean-like';
import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';
import { InputIconPosition } from './text/input.component';

@Directive({
    providers: InputBaseComponent.providers,
    host: {
        '[class.icon]': 'icon()',
        '[class.focus]': 'focused()',
        '[class.disabled]': 'disabled()',
        '[class.readonly]': 'readonly()',
        '[class.error]': 'hasError()',
        '[class.transparent]': 'transparent()',
        '[class.color]': 'isColor()'
    }
})
export abstract class InputBaseComponent extends LabeledBaseComponent {
    public static readonly defaults = {
        inverted: signal(false)
    };
    protected static override readonly providers = [...LabeledBaseComponent.providers];
    protected readonly colorForId = Date.now().toString() + Math.random().toString();
    private readonly contentInput = contentChild<ElementRef<HTMLInputElement>>('input');
    private readonly viewInput = viewChild<ElementRef<HTMLInputElement>>('input');
    // A projected <input #input> replaces the built-in one (that one only renders when no <input> is projected).
    private readonly activeInput = computed(() => this.contentInput() ?? this.viewInput());
    public readonly iconPosition = input<InputIconPosition>();
    public readonly icon = input<IconType>();
    public readonly iconSize = input<IconSize>();
    public readonly loading = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly fluid = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly focused = signal(false);
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly disabledInput = input<boolean, BooleanLike>(false, { alias: 'disabled', transform: toBoolean });
    public readonly disabledChange = output<boolean>();
    public readonly disabled = transformableModel(this.disabledInput, this.disabledChange, toBoolean);
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly readonlyInput = input<boolean, BooleanLike>(false, { alias: 'readonly', transform: toBoolean });
    public readonly readonlyChange = output<boolean>();
    public readonly readonly = transformableModel(this.readonlyInput, this.readonlyChange, toBoolean);
    public readonly hasError = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly transparent = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly autofocus = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly placeholder = input<string>();
    public readonly name = model<string>();
    public readonly for = model<string>();
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
    protected readonly isColor = signal(false);

    public get inputElement(): ElementRef<HTMLInputElement> | undefined {
        return this.activeInput();
    }

    protected constructor() {
        super();
        effect(() => this.refreshInverted(InputBaseComponent.defaults.inverted()));
        this.classes.registerFixed('input');
        this.classes.register('loading', 'fluid', 'iconPosition');
        effect(() => this.classes.set('loading', this.loading()));
        effect(() => this.classes.set('fluid', this.fluid()));
        effect(() => this.classes.set('iconPosition', this.iconPosition()));
        // Push disabled/readonly onto the native element whenever they or the element change.
        effect(() => {
            const input = this.activeInput()?.nativeElement;
            if (input) {
                input.disabled = this.disabled();
                input.readOnly = this.readonly();
            }
        });
        effect(onCleanup => {
            const input = this.activeInput()?.nativeElement;
            if (input) {
                this.bindEvents(input);
                onCleanup(() => this.unbindEvents(input));
            }
        });
        effect(() => {
            const input = this.activeInput()?.nativeElement;
            if (input && this.autofocus()) {
                setTimeout(() => input.focus());
            }
        });
    }

    private readonly keyDownEventHandler = (event: KeyboardEvent): void => this.keyDown.emit(event);
    private readonly keyUpEventHandler = (event: KeyboardEvent): void => this.keyUp.emit(event);
    private readonly keyPressEventHandler = (event: Event): void => this.keyPress.emit(event);
    private readonly blurEventHandler = (event: FocusEvent): void => this.blur.emit(event);
    private readonly focusEventHandler = (event: FocusEvent): void => this.focus.emit(event);
    private readonly focusinEventHandler = (event: FocusEvent): void => this.focusin.emit(event);
    private readonly focusoutEventHandler = (event: FocusEvent): void => this.focusout.emit(event);

    // The projected input can't get template event bindings, so both variants are bound by hand.
    private bindEvents(input: HTMLInputElement): void {
        input.addEventListener('keydown', this.keyDownEventHandler);
        input.addEventListener('keyup', this.keyUpEventHandler);
        input.addEventListener('keypress', this.keyPressEventHandler);
        input.addEventListener('blur', this.blurEventHandler);
        input.addEventListener('focus', this.focusEventHandler);
        input.addEventListener('focusin', this.focusinEventHandler);
        input.addEventListener('focusout', this.focusoutEventHandler);
    }

    private unbindEvents(input: HTMLInputElement): void {
        input.removeEventListener('keydown', this.keyDownEventHandler);
        input.removeEventListener('keyup', this.keyUpEventHandler);
        input.removeEventListener('keypress', this.keyPressEventHandler);
        input.removeEventListener('blur', this.blurEventHandler);
        input.removeEventListener('focus', this.focusEventHandler);
        input.removeEventListener('focusin', this.focusinEventHandler);
        input.removeEventListener('focusout', this.focusoutEventHandler);
    }

    public setFocus(): void {
        this.activeInput()?.nativeElement.focus();
    }
}
