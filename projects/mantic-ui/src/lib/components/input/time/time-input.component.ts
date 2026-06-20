import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, ContentChild, effect, ElementRef, input, OnInit, output, signal, untracked, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FallbackForDirective } from '../../../directives/fallback-for.directive';
import { DateHelper } from '../../../helpers/date-helper';
import { IconComponent } from '../../icon/icon.component';
import { InputBaseComponent } from '../input-base.component';

@Component({
    selector: 'm-time-input',
    templateUrl: './time-input.component.html',
    styleUrls: ['./time-input.component.scss'],
    imports: [FormsModule, IconComponent, FallbackForDirective, NgTemplateOutlet],
    providers: [...InputBaseComponent.providers]
})
export class TimeInputComponent extends InputBaseComponent implements OnInit {
    // eslint-disable-next-line unicorn/no-null
    protected readonly internalValue = signal<string | null>(null);
    protected readonly valueState = signal<Date | undefined>(undefined);
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly valueInput = input<Date | undefined, Date | number | string | undefined>(undefined, { alias: 'value', transform: value => TimeInputComponent.coerceDate(value) });
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly timeInput = input<Date | undefined, Date | number | string | undefined>(undefined, { alias: 'time', transform: value => TimeInputComponent.coerceDate(value) });
    public readonly default = input(new Date(0));
    public readonly min = input<Date>();
    public readonly max = input<Date>();
    public readonly value = computed(() => this.valueState());
    public readonly time = computed(() => this.valueState() ?? this.default());
    public readonly valueChange = output<Date | undefined>();
    public readonly timeChange = output<Date>();

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
        this.classes.register('min', 'max', 'default', 'value', 'time');
        // [value] flows into the shared state (normalising the display); [time] is guarded so an unbound alias can't clobber [value].
        effect(() => {
            const value = this.valueInput();
            untracked(() => this.applyValue(value));
        });
        effect(() => {
            const value = this.timeInput();
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

    protected onInternalChange(rawValue: string): void {
        // Clone the current value so the stored Date is never mutated in place (which a signal set would treat as unchanged).
        const current = this.valueState();
        let value = current ? new Date(current) : new Date();
        const chunks = rawValue.split(':');
        value.setHours(parseInt(chunks[0]) || 0, parseInt(chunks[1]) || 0, 0, 0);
        value = DateHelper.keepInRange(this.min(), value, this.max());
        this.valueState.set(value);
        this.valueChange.emit(this.value());
        this.timeChange.emit(this.time());
    }

    // Mirrors the old `value` setter: normalise the display only when the value actually changes, then store it (without emitting).
    private applyValue(value: Date | undefined): void {
        if (value != this.valueState()) {
            this.setInternalValue(value);
        }
        this.valueState.set(value);
    }

    private static coerceDate(value: Date | number | string | undefined): Date | undefined {
        const date = value ? new Date(value) : undefined;
        return isNaN(date?.getDate() as any) ? undefined : date;
    }

    private setInternalValue(value: Date | null | undefined): void {
        // Use null to avoid strange input behaviour with undefined values (e.g. input of negative values requires two minus signs to work)
        // eslint-disable-next-line no-null/no-null
        this.internalValue.set(value?.toISOString().split('T')[1].replace('Z', '') ?? null);
    }
}
