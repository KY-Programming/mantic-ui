import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, DestroyRef, effect, inject, input, OnInit, output, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AttachedDirective } from '../../../directives/attached.directive';
import { FallbackForDirective } from '../../../directives/fallback-for.directive';
import { Math2 } from '../../../helpers/math2';
import { toBoolean } from '../../../helpers/to-boolean';
import { IconComponent } from '../../icon/icon.component';
import { InputBaseComponent } from '../input-base.component';

/** Holding an up / down button: pause before it starts repeating, then the time between two steps, in ms (as the browser's own spin buttons). */
const stepRepeatDelay = 400;
const stepRepeatInterval = 60;

@Component({
    selector: 'm-numeric-input',
    templateUrl: './numeric-input.component.html',
    styleUrls: ['./numeric-input.component.scss'],
    imports: [IconComponent, FallbackForDirective, FormsModule, NgTemplateOutlet],
    providers: [...InputBaseComponent.providers],
    hostDirectives: [AttachedDirective.default],
    host: {
        '[class.stepper]': 'hasStepper()'
    }
})
export class NumericInputComponent extends InputBaseComponent implements OnInit {
    // eslint-disable-next-line unicorn/no-null
    protected readonly internalValue = signal<number | null>(null);
    protected readonly valueState = signal<number | undefined>(undefined);
    public readonly default = input(0);
    public readonly min = input<number>();
    public readonly max = input<number>();
    public readonly zeroText = input<string>();
    public readonly range = input(false, { transform: toBoolean });
    public readonly type = computed<'number' | 'range'>(() => this.range() ? 'range' : 'number');
    /** Amount the up / down buttons (and the arrow keys) add or take away. */
    public readonly step = input(1);
    /** The up / down buttons replace the browser's own spin buttons; not on a slider (`range`) or a read-only field. */
    protected readonly hasStepper = computed(() => !this.range() && !this.readonly());
    /** The number stepping starts from: the value; in an empty field a numeric placeholder, else `default`. */
    private readonly stepBase = computed(() => {
        const value = this.value();
        if (value !== undefined) {
            return value;
        }
        const placeholder = this.placeholder()?.trim();
        const placeholderNumber = placeholder ? Number(placeholder) : NaN;
        return Number.isFinite(placeholderNumber) ? placeholderNumber : this.default();
    });
    protected readonly canStepUp = computed(() => !this.disabled() && (this.max() === undefined || this.stepBase() < (this.max() ?? 0)));
    private stepTimer: ReturnType<typeof setTimeout> | undefined;
    protected readonly canStepDown = computed(() => !this.disabled() && (this.min() === undefined || this.stepBase() > (this.min() ?? 0)));
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly valueInput = input<number | undefined>(undefined, { alias: 'value' });
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly numberInput = input<number | undefined>(undefined, { alias: 'number' });
    public readonly value = computed(() => this.valueState());
    public readonly number = computed(() => this.valueState() ?? this.default());
    protected readonly placeholderInternal = computed(() => {
        const zeroText = this.zeroText();
        return this.value() === 0 && zeroText ? zeroText : this.placeholder() ?? '';
    });
    public readonly valueChange = output<number | undefined>();
    public readonly numberChange = output<number>();

    public constructor() {
        super();
        inject(DestroyRef).onDestroy(() => this.stopStepping());
        effect(onCleanup => {
            const element = this.inputElement?.nativeElement;
            if (element) {
                const onWheel = (event: WheelEvent): void => this.onWheel(event, element);
                // Not passive: a focused field takes the wheel away from the page
                element.addEventListener('wheel', onWheel, { passive: false });
                onCleanup(() => element.removeEventListener('wheel', onWheel));
            }
        });
        // [value] flows into the shared state (normalising the display); [number] is guarded so an unbound alias can't clobber [value].
        effect(() => {
            const value = this.valueInput();
            untracked(() => this.applyValue(value));
        });
        effect(() => {
            const value = this.numberInput();
            untracked(() => {
                if (value !== undefined) {
                    this.applyValue(value);
                }
            });
        });
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        // Set internal value on blur to ensure a invalid value is overwritten
        this.blur.subscribe(() => this.setInternalValue(this.value()));
        this.keyDown.subscribe(event => this.onKeyDown(event));
    }

    protected onInternalChange(rawValue: string | number | null | undefined): void {
        let value = typeof rawValue === 'string' ? rawValue !== '' ? parseFloat(rawValue) : undefined : rawValue ?? undefined;
        this.setInternalValue(value);
        value = value == undefined || Number.isNaN(value) ? undefined : Math2.keepInRange(this.min(), value, this.max());
        if (value !== this.value()) {
            this.valueState.set(value);
            this.valueChange.emit(this.value());
            this.numberChange.emit(this.number());
        }
    }

    /** Steps once on press, then, while the button is held, repeatedly: after a pause, then quickly, until `min` / `max`. */
    protected startStepping(event: PointerEvent, direction: 1 | -1): void {
        if (event.button !== 0) {
            return;
        }
        // keeps the focus in the field; the capture delivers the release even when the pointer has left the button
        event.preventDefault();
        (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
        this.stopStepping();
        this.stepBy(direction);
        const repeat = (delay: number): void => {
            this.stepTimer = setTimeout(() => {
                if (!(direction === 1 ? this.canStepUp() : this.canStepDown())) {
                    this.stopStepping();
                    return;
                }
                this.stepBy(direction);
                repeat(stepRepeatInterval);
            }, delay);
        };
        repeat(stepRepeatDelay);
    }

    protected stopStepping(): void {
        clearTimeout(this.stepTimer);
        this.stepTimer = undefined;
    }

    /** Adds `direction` × `step` to the value (see `stepBase` for an empty one), rounded to the step's decimals so 0.1 + 0.2 stays 0.3. */
    protected stepBy(direction: 1 | -1): void {
        const step = this.step();
        const base = this.stepBase();
        const decimals = Math.max(String(step).split('.', 2)[1]?.length ?? 0, String(base).split('.', 2)[1]?.length ?? 0);
        const value = Number((base + direction * step).toFixed(decimals));
        this.onInternalChange(Math2.keepInRange(this.min(), value, this.max()));
    }

    // Always handled here, not only for an empty field: browsers differ on whether the wheel steps a number field at all,
    // so this way it behaves the same everywhere, and preventDefault keeps a browser's own stepping from adding a second step.
    private onWheel(event: WheelEvent, element: HTMLInputElement): void {
        if (document.activeElement !== element || !this.hasStepper() || element.validity.badInput || event.deltaY === 0) {
            return;
        }
        event.preventDefault();
        this.stepBy(event.deltaY < 0 ? 1 : -1);
    }

    // The browser steps an empty field from 0 and knows nothing of `stepBase`, so the first arrow key is handled here, as the
    // buttons do it. From then on the field has a value and the browser's own stepping takes over. A field with text the
    // browser can't read also reports an empty value (badInput): that one stays with the browser.
    private onKeyDown(event: KeyboardEvent): void {
        if ((event.key !== 'ArrowUp' && event.key !== 'ArrowDown') || !this.hasStepper()) {
            return;
        }
        const element = event.target as HTMLInputElement;
        if (element.value !== '' || element.validity.badInput) {
            return;
        }
        event.preventDefault();
        this.stepBy(event.key === 'ArrowUp' ? 1 : -1);
    }

    // Mirrors the old `value` setter: normalise the display only when the value actually changes, then store it (without emitting).
    private applyValue(value: number | undefined): void {
        if (value != this.valueState()) {
            this.setInternalValue(value);
        }
        this.valueState.set(value);
    }

    private setInternalValue(value: number | null | undefined): void {
        if (value === 0 && this.zeroText()) {
            // Use null to avoid strange input behaviour with undefined values (e.g. input of negative values requires two minus signs to work)
            // eslint-disable-next-line no-null/no-null
            this.internalValue.set(null);
            return;
        }
        // Use null to avoid strange input behaviour with undefined values (e.g. input of negative values requires two minus signs to work)
        // eslint-disable-next-line no-null/no-null
        this.internalValue.set(value ?? null);
    }
}
