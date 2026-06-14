import { Directive, effect, ElementRef, input, model, OnDestroy, output, signal } from '@angular/core';
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
export abstract class InputBaseComponent extends LabeledBaseComponent implements OnDestroy {
    public static readonly defaults = {
        inverted: signal(false)
    };
    protected static override readonly providers = [...LabeledBaseComponent.providers];
    protected readonly colorForId = Date.now().toString() + Math.random().toString();
    public inputElement: ElementRef<HTMLInputElement> | undefined;
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

    protected constructor() {
        super();
        effect(() => this.refreshInverted(InputBaseComponent.defaults.inverted()));
        this.classes.registerFixed('input');
        this.classes.register('loading', 'fluid', 'icon', 'focused', 'disabled', 'readonly', 'transparent', 'hasError', 'autofocus', 'placeholder', 'iconPosition');
        effect(() => this.classes.set('loading', this.loading()));
        effect(() => this.classes.set('fluid', this.fluid()));
        effect(() => this.classes.set('iconPosition', this.iconPosition()));
        // Push disabled/readonly onto the native element, and (re)focus, whenever they change.
        effect(() => {
            this.disabled();
            this.readonly();
            this.refreshInput();
        });
        effect(() => this.refreshFocus());
    }

    public override ngOnDestroy(): void {
        super.ngOnDestroy();
        this.unbindEvents();
    }

    protected refreshInput(): void {
        if (!this.inputElement) {
            return;
        }
        this.inputElement.nativeElement.disabled = this.disabled();
        this.inputElement.nativeElement.readOnly = this.readonly();
    }

    private readonly keyDownEventHandler = (event: KeyboardEvent): void => this.keyDown.emit(event);
    private readonly keyUpEventHandler = (event: KeyboardEvent): void => this.keyUp.emit(event);
    private readonly keyPressEventHandler = (event: Event): void => this.keyPress.emit(event);
    private readonly blurEventHandler = (event: FocusEvent): void => this.blur.emit(event);
    private readonly focusEventHandler = (event: FocusEvent): void => this.focus.emit(event);
    private readonly focusinEventHandler = (event: FocusEvent): void => this.focusin.emit(event);
    private readonly focusoutEventHandler = (event: FocusEvent): void => this.focusout.emit(event);

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
        if (this.autofocus() && this.inputElement) {
            setTimeout(() => this.setFocus());
        }
    }

    public setFocus(): void {
        this.inputElement?.nativeElement.focus();
    }
}
