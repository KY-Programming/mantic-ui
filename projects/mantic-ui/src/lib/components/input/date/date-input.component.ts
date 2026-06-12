import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ChangeDetectionStrategy, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FallbackForDirective } from '../../../directives/fallback-for.directive';
import { DateHelper } from '../../../helpers/date-helper';
import { BooleanLike } from '../../../models/boolean-like';
import { ColorName } from '../../../models/color';
import { IconComponent } from '../../icon/icon.component';
import { LabelComponent } from '../../label/label.component';
import { InputBaseComponent } from '../input-base.component';

@Component({
    selector: 'm-date-input',
    templateUrl: './date-input.component.html',
    styleUrls: ['./date-input.component.scss'],
    imports: [IconComponent, FallbackForDirective, FormsModule, LabelComponent, NgTemplateOutlet, DatePipe],
    changeDetection: ChangeDetectionStrategy.Eager,
    providers: [...InputBaseComponent.providers]
})
export class DateInputComponent extends InputBaseComponent implements OnInit {
    private valueField: Date | undefined;
    private showDayValue = false;

    // eslint-disable-next-line no-null/no-null
    protected internalValue: string | null = null;

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    public get value(): Date | undefined {
        return this.valueField;
    }

    public set value(value: Date | number | string | undefined) {
        value = value ? new Date(value) : undefined;
        value = isNaN(value?.getDate() as any) ? undefined : value;
        if (value != this.valueField) {
            this.setInternalValue(value);
        }
        this.valueField = value;
    }

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    public get date(): Date {
        return this.value ?? this.default();
    }

    public set date(value: Date | number | string | undefined) {
        this.value = value;
    }

    public readonly default = input(new Date(0));

    public readonly min = input<Date>();

    public readonly max = input<Date>();

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    public get showDay(): boolean {
        return this.showDayValue;
    }

    public set showDay(value: BooleanLike) {
        this.showDayValue = this.toBoolean(value);
        this.classes.set('labeled', this.showDayValue);
    }

    public readonly weekendColor = input<ColorName | undefined>('red');

    @Output()
    public readonly valueChange = new EventEmitter<Date | undefined>();

    @Output()
    public readonly dateChange = new EventEmitter<Date>();

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
        this.classes.register('min', 'max', 'default', 'value', 'date', 'showDay', 'weekendColor');
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        // Set internal value on blur to ensure a invalid value is overwritten
        this.blur.subscribe(() => this.setInternalValue(this.value));
    }

    protected onInternalChange(rawValue: string): void {
        let value = rawValue ? new Date(rawValue) : undefined;
        if (value) {
            this.setInternalValue(value);
        }
        value = DateHelper.keepInRange(this.min(), value, this.max());
        if (value !== this.value) {
            this.valueField = value;
            this.valueChange.emit(this.value);
            this.dateChange.emit(this.date);
        }
    }

    private setInternalValue(value: Date | null | undefined): void {
        // Use null to avoid strange input behaviour with undefined values (e.g. input of negative values requires two minus signs to work)
        // eslint-disable-next-line no-null/no-null
        this.internalValue = value?.toISOString().split('T')[0] ?? null;
    }
}
