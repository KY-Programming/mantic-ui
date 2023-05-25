import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputBaseComponent } from '../input-base.component';
import { DateHelper } from '../../../helpers/date-helper';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../icon/icon.component';
import { FallbackForDirective } from '../../../directives/fallback-for.directive';

@Component({
    selector: 'm-time-input',
    templateUrl: './time-input.component.html',
    styleUrls: ['./time-input.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        IconComponent,
        FallbackForDirective
    ],
    hostDirectives: [...InputBaseComponent.directives],
    providers: [...InputBaseComponent.providers]
})
export class TimeInputComponent extends InputBaseComponent implements OnInit {
    private valueField: Date | undefined;

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
        const oldValue = this.valueField ? new Date(this.valueField) : this.valueField;
        let value = this.valueField ?? new Date();
        const chunks = rawValue.split(':');
        value.setHours(parseInt(chunks[0]) || 0, parseInt(chunks[1]) || 0, 0, 0);
        value = DateHelper.keepInRange(this.min, value, this.max);
        if (value !== this.valueField || oldValue !== value) {
            this.valueField = value;
            this.valueChange.emit(this.valueField);
        }
    }

    private setInternalValue(value: Date | null | undefined): void {
        // Use null to avoid strange input behaviour with undefined values (e.g. input of negative values requires two minus signs to work)
        // eslint-disable-next-line no-null/no-null
        this.internalValue = value?.toISOString().split('T')[1].replace('Z', '') ?? null;
    }

}
