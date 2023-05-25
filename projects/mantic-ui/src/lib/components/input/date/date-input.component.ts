import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DateHelper } from '../../../helpers/date-helper';
import { InputBaseComponent } from '../input-base.component';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../icon/icon.component';
import { FallbackForDirective } from '../../../directives/fallback-for.directive';
import { FormsModule } from '@angular/forms';
import { LabelComponent } from '../../label/label.component';
import { BooleanLike } from '../../../models/boolean-like';
import { ColorName } from '../../../models/color';

@Component({
    selector: 'm-date-input',
    templateUrl: './date-input.component.html',
    styleUrls: ['./date-input.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IconComponent,
        FallbackForDirective,
        FormsModule,
        LabelComponent
    ],
    hostDirectives: [...InputBaseComponent.directives],
    providers: [...InputBaseComponent.providers]
})
export class DateInputComponent extends InputBaseComponent implements OnInit {
    private valueField: Date | undefined;
    private showDayValue = false;

    // eslint-disable-next-line no-null/no-null
    protected internalValue: string | null = null;

    @Input()
    public get value(): Date | undefined {
        return this.valueField;
    }

    public set value(value: Date | number | string | undefined) {
        value ??= this.defaultValue;
        value = value ? new Date(value) : undefined;
        value = isNaN(value?.getDate() as any) ? undefined : value;
        if (value != this.valueField) {
            this.setInternalValue(value);
        }
        this.valueField = value;
    }

    @Input()
    public defaultValue: Date | undefined;

    @Input()
    public min: Date | undefined;

    @Input()
    public max: Date | undefined;

    @Input()
    public get showDay(): boolean {
        return this.showDayValue;
    }

    public set showDay(value: BooleanLike) {
        this.showDayValue = this.toBoolean(value);
        this.classes.set('labeled', this.showDayValue);
    }

    @Input()
    public weekendColor: ColorName | undefined = 'red';

    @Output()
    public readonly valueChange = new EventEmitter<Date | undefined>();

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
        this.classes.register('min', 'max', 'defaultValue', 'value');
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        // Set internal value on blur to ensure a invalid value is overwritten
        this.blur.subscribe(() => this.setInternalValue(this.value));
    }

    protected onInternalChange(rawValue: string): void {
        let value = rawValue ? new Date(rawValue) : undefined;
        value ??= this.defaultValue;
        if (value) {
            this.setInternalValue(value);
        }
        value = DateHelper.keepInRange(this.min, value, this.max);
        if (value !== this.value) {
            this.valueField = value;
            this.valueChange.emit(this.value);
        }
    }

    private setInternalValue(value: Date | null | undefined): void {
        // Use null to avoid strange input behaviour with undefined values (e.g. input of negative values requires two minus signs to work)
        // eslint-disable-next-line no-null/no-null
        this.internalValue = value?.toISOString().split('T')[0] ?? null;
    }
}
