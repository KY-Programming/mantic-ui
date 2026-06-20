import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, ContentChild, effect, ElementRef, input, OnInit, output, signal, untracked, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FallbackForDirective } from '../../../directives/fallback-for.directive';
import { Math2 } from '../../../helpers/math2';
import { toBoolean } from '../../../helpers/to-boolean';
import { IconComponent } from '../../icon/icon.component';
import { InputBaseComponent } from '../input-base.component';

@Component({
    selector: 'm-numeric-input',
    templateUrl: './numeric-input.component.html',
    styleUrls: ['./numeric-input.component.scss'],
    imports: [IconComponent, FallbackForDirective, FormsModule, NgTemplateOutlet],
    providers: [...InputBaseComponent.providers]
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

    @ContentChild('input')
    protected set contentInputElement(input: ElementRef<HTMLInputElement>) {
        this.unbindEvents();
        this.inputElement = input;
        this.refreshInput();
        this.bindEvents();
        this.refreshFocus();
    }

    @ViewChild('input')
    protected set viewInputElement(input: ElementRef<HTMLInputElement>) {
        this.unbindEvents();
        this.inputElement = input;
        this.bindEvents();
        this.refreshFocus();
    }

    public constructor() {
        super();
        this.classes.register('min', 'max', 'default', 'value', 'range', 'zeroText', 'number');
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
    }

    protected onInternalChange(rawValue: string | null | undefined): void {
        let value = typeof rawValue === 'string' ? rawValue !== '' ? parseFloat(rawValue) : undefined : rawValue ?? undefined;
        this.setInternalValue(value);
        value = value == undefined || Number.isNaN(value) ? undefined : Math2.keepInRange(this.min(), value, this.max());
        if (value !== this.value()) {
            this.valueState.set(value);
            this.valueChange.emit(this.value());
            this.numberChange.emit(this.number());
        }
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
