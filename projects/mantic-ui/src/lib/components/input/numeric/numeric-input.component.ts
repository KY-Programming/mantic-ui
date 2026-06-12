import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ChangeDetectionStrategy, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FallbackForDirective } from '../../../directives/fallback-for.directive';
import { Math2 } from '../../../helpers/math2';
import { BooleanLike } from '../../../models/boolean-like';
import { IconComponent } from '../../icon/icon.component';
import { InputBaseComponent } from '../input-base.component';

@Component({
    selector: 'm-numeric-input',
    templateUrl: './numeric-input.component.html',
    styleUrls: ['./numeric-input.component.scss'],
    imports: [IconComponent, FallbackForDirective, FormsModule, NgTemplateOutlet],
    changeDetection: ChangeDetectionStrategy.Eager,
    providers: [...InputBaseComponent.providers]
})
export class NumericInputComponent extends InputBaseComponent implements OnInit {
    private valueField: number | undefined;
    private rangeValue = false;
    // eslint-disable-next-line no-null/no-null
    protected internalValue: number | null = null;
    public type: 'number' | 'range' = 'number';

    public readonly default = input(0);

    public readonly min = input<number>();

    public readonly max = input<number>();

    public readonly zeroText = input<string>();

    protected get placeholderInternal(): string {
        const zeroText = this.zeroText();
        return this.value === 0 && zeroText ? zeroText : this.placeholder() ?? '';
    }

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    public get value(): number | undefined {
        return this.valueField;
    }

    public set value(value: number | undefined) {
        if (value != this.valueField) {
            this.setInternalValue(value);
        }
        this.valueField = value;
    }

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    public get number(): number {
        return this.value ?? this.default();
    }

    public set number(value: number | undefined) {
        this.value = value;
    }

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    public get range(): boolean {
        return this.rangeValue;
    }

    public set range(value: BooleanLike) {
        this.rangeValue = this.toBoolean(value);
        this.type = this.rangeValue ? 'range' : 'number';
    }

    @Output()
    public readonly valueChange = new EventEmitter<number | undefined>();

    @Output()
    public readonly numberChange = new EventEmitter<number>();

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
        this.classes.register('min', 'max', 'defaultValue', 'value', 'range', 'zeroText', 'number');
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        // Set internal value on blur to ensure a invalid value is overwritten
        this.blur.subscribe(() => this.setInternalValue(this.value));
    }

    protected onInternalChange(rawValue: string | null | undefined): void {
        let value = typeof rawValue === 'string' ? rawValue !== '' ? parseFloat(rawValue) : undefined : rawValue ?? undefined;
        this.setInternalValue(value);
        value = value == undefined || Number.isNaN(value) ? undefined : Math2.keepInRange(this.min(), value, this.max());
        if (value !== this.value) {
            this.valueField = value;
            this.valueChange.emit(this.value);
            this.numberChange.emit(this.number);
        }
    }

    private setInternalValue(value: number | null | undefined): void {
        if (value === 0 && this.zeroText()) {
            // Use null to avoid strange input behaviour with undefined values (e.g. input of negative values requires two minus signs to work)
            // eslint-disable-next-line no-null/no-null
            this.internalValue = null;
            return;
        }
        // Use null to avoid strange input behaviour with undefined values (e.g. input of negative values requires two minus signs to work)
        // eslint-disable-next-line no-null/no-null
        this.internalValue = value ?? null;
    }
}
