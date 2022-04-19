import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { Key } from '../models/key';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'm-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends BaseComponent {
    private nameValue: string;
    private labelValue: string;
    private isChecked: boolean;
    private isReadonly: boolean;
    private isIndeterminate: boolean;
    private isDisabled: boolean;

    @Input()
    public get value(): boolean | string {
        return this.isChecked;
    }

    public set value(value: string | boolean | undefined) {
        this.isChecked = this.toBoolean(value);
    }

    @Output()
    public readonly valueChange = new EventEmitter<boolean>();

    @Input()
    public get name(): string {
        return this.nameValue;
    }

    public set name(value: string) {
        this.nameValue = value;
        this.classList.set('name', value);
    }

    @Input()
    public get label(): string {
        return this.labelValue;
    }

    public set label(value: string) {
        this.labelValue = value;
        this.classList.set('label', value);
    }

    @Input()
    @HostBinding('class.checked')
    public get checked(): boolean | string {
        return this.isChecked;
    }

    public set checked(value: string | boolean) {
        this.isChecked = this.toBoolean(value);
    }

    @Output()
    public readonly checkedChange = this.valueChange;

    @Input()
    @HostBinding('class.read-only')
    public get readonly(): boolean | string {
        return this.isReadonly;
    }

    public set readonly(value: string | boolean) {
        this.isReadonly = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.indeterminate')
    public get indeterminate(): boolean | string {
        return this.isIndeterminate;
    }

    public set indeterminate(value: string | boolean) {
        this.isIndeterminate = this.toBoolean(value);
    }

    @Output()
    public readonly indeterminateChange = this.valueChange;

    @Input()
    @HostBinding('class.disabled')
    public get disabled(): boolean | string {
        return this.isDisabled;
    }

    public set disabled(value: string | boolean) {
        this.isDisabled = this.toBoolean(value);
    }

    @Input()
    public canUncheck = true;

    @HostBinding('class.checkbox')
    public readonly checkbox = true;

    constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList.register('readonly', 'indeterminate', 'disabled', 'fitted', 'checked', 'value', 'name', 'label');
    }

    @HostListener('click', ['$event'])
    public onClick(event: MouseEvent): void {
        if (event.target instanceof HTMLInputElement || this.readonly || this.disabled) {
            return;
        }
        this.set(!this.value);
    }

    @HostListener('keydown', ['$event'])
    public onKeyDown(event: KeyboardEvent): void {
        if (this.readonly || this.disabled || event.code !== Key.space) {
            return;
        }
        event.preventDefault();
        this.set(!this.value);
    }

    public set(value: boolean): void {
        if (!value && !this.canUncheck) {
            return;
        }
        this.indeterminate = false;
        if (this.value !== value) {
            this.value = value;
            this.onChange();
        }
        this.refreshClasses();
    }

    public onChange(): void {
        this.valueChange.emit(this.isChecked);
    }

    public onInputValueChange(event: Event): void {
        this.set((event.target as HTMLInputElement).checked);
    }

}
