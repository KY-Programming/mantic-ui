import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, effect, input, OnInit, output, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AttachedDirective } from '../../../directives/attached.directive';
import { FallbackForDirective } from '../../../directives/fallback-for.directive';
import { DateHelper } from '../../../helpers/date-helper';
import { IconComponent } from '../../icon/icon.component';
import { InputBaseComponent } from '../input-base.component';

const timePattern = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/;

@Component({
    selector: 'm-time-input',
    templateUrl: './time-input.component.html',
    styleUrls: ['./time-input.component.scss'],
    imports: [FormsModule, IconComponent, FallbackForDirective, NgTemplateOutlet],
    providers: [...InputBaseComponent.providers],
    hostDirectives: [AttachedDirective.default]
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
    protected readonly minText = computed(() => TimeInputComponent.format(this.min()) ?? '');
    protected readonly maxText = computed(() => TimeInputComponent.format(this.max()) ?? '');
    public readonly valueChange = output<Date | undefined>();
    public readonly timeChange = output<Date>();

    public constructor() {
        super();
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
        if (typeof value === 'string') {
            const time = this.parseTime(value);
            if (time) {
                return time;
            }
        }
        const date = value ? new Date(value) : undefined;
        return isNaN(date?.getDate() as any) ? undefined : date;
    }

    /** A plain time (`10:30`, `10:30:15`) on today's date, as a time typed into the field gets; `new Date()` can't read it */
    private static parseTime(value: string): Date | undefined {
        const match = timePattern.exec(value.trim());
        if (!match) {
            return undefined;
        }
        const [hours, minutes, seconds] = [match[1], match[2], match.at(3) ?? '0'].map(Number);
        if (hours > 23 || minutes > 59 || seconds > 59) {
            return undefined;
        }
        const date = new Date();
        date.setHours(hours, minutes, seconds, 0);
        return date;
    }

    private setInternalValue(value: Date | null | undefined): void {
        // Use null to avoid strange input behaviour with undefined values (e.g. input of negative values requires two minus signs to work)
        // eslint-disable-next-line unicorn/no-null
        this.internalValue.set(TimeInputComponent.format(value) ?? null);
    }

    /** Local time, like the parsing in onInternalChange - toISOString() would show UTC and shift the time by the zone offset. */
    private static format(value: Date | null | undefined): string | undefined {
        if (!value) {
            return undefined;
        }
        return `${value.getHours().toString().padStart(2, '0')}:${value.getMinutes().toString().padStart(2, '0')}`;
    }
}
