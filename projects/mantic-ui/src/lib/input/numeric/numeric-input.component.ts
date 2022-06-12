import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { InputBaseComponent } from '../input-base.component';
import { Math2 } from '../../helpers/math2';

@Component({
    selector: 'm-numeric-input',
    templateUrl: './numeric-input.component.html',
    styleUrls: ['./numeric-input.component.scss']
})
export class NumericInputComponent extends InputBaseComponent implements OnInit {
    private valueField: number | undefined;

    public internalValue: number | null;

    @Input()
    public get value(): number | undefined {
        return this.valueField;
    }

    public set value(value: number | undefined) {
        value ??= this.defaultValue;
        if (value != this.valueField) {
            this.setInternalValue(value);
        }
        this.valueField = value;
    }

    @Input()
    public defaultValue: number | undefined;

    @Input()
    public min: number | undefined;

    @Input()
    public max: number | undefined;

    @Output()
    public readonly valueChange = new EventEmitter<number | undefined>();

    @ContentChild('input')
    public set contentInputElement(input: ElementRef<HTMLInputElement>) {
        this.inputElement = input;
        this.refreshInput();
        this.bindEvents();
        this.refreshFocus();
    }

    @ViewChild('input')
    public set viewInputElement(input: ElementRef<HTMLInputElement>) {
        this.inputElement = input;
        this.bindEvents();
        this.refreshFocus();
    }

    public constructor() {
        super();
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        // Set internal value on blur to ensure a invalid value is overwritten
        this.blur.subscribe(() => this.setInternalValue(this.value));
    }

    public onInternalChange(value: number | null | undefined): void {
        value ??= this.defaultValue;
        this.setInternalValue(value);
        value = value == undefined ? undefined : Math2.keepInRange(this.min, value, this.max);
        if (value !== this.value) {
            this.valueField = value;
            this.valueChange.emit(this.value);
        }
    }

    private setInternalValue(value: number | null | undefined): void {
        // Use null to avoid strange input behaviour with undefined values (e.g. input of negative values requires two minus signs to work)
        // eslint-disable-next-line no-null/no-null
        this.internalValue = value ?? null;
    }
}
