import { AsyncPipe } from '@angular/common';
import { Component, DoCheck, HostBinding, Input, IterableDiffer, IterableDiffers, Output } from '@angular/core';
import { merge, Observable, ReplaySubject, Subject } from 'rxjs';
import { BaseComponent } from '../../base/base.component';
import { HeaderDirective } from '../../directives/header.directive';
import { BooleanLike } from '../../models/boolean-like';
import { ButtonComponent } from '../button/button.component';
import { CellComponent } from '../cell/cell.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { DataSourceComponent } from '../data-source/data-source.component';
import { DividerComponent } from '../divider/divider.component';
import { DropdownValue } from '../dropdown/dropdown-value';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { ErrorComponent } from '../error/error.component';
import { FieldComponent } from '../field/field.component';
import { FormAreaElement, FormButtonElement, FormCheckboxElement, FormDataElement, FormDropDownElement, FormElements, FormError, FormFieldGroupElement, FormGridElement, FormHeader, FormInfo, FormInputElement, FormLabelElement, FormMessage, FormWarning } from '../form-renderer/form-layout';
import { GridComponent } from '../grid/grid.component';
import { InfoComponent } from '../info/info.component';
import { NumericInputComponent } from '../input/numeric/numeric-input.component';
import { InputComponent } from '../input/text/input.component';
import { MessageComponent } from '../message/message.component';
import { TextareaComponent } from '../textarea/textarea.component';
import { WarningComponent } from '../warning/warning.component';
import { FormElementRenderer2Component } from './form-element-renderer2.component';

@Component({
    selector: 'm-form-element-renderer',
    templateUrl: './form-element-renderer.component.html',
    styleUrls: ['./form-element-renderer.component.scss'],
    imports: [FieldComponent, InputComponent, NumericInputComponent, CheckboxComponent, TextareaComponent, DropdownComponent, ButtonComponent, GridComponent, CellComponent, MessageComponent, WarningComponent, InfoComponent, ErrorComponent, DividerComponent, FormElementRenderer2Component, HeaderDirective, AsyncPipe],
    providers: [...BaseComponent.providers]
})
export class FormElementRendererComponent extends BaseComponent implements DoCheck {
    private isFields = false;
    private readonly elementsDiffer: IterableDiffer<FormElements>;
    private readonly fieldClasses = ['', '', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    private readonly dataCache = new Map<string, Observable<Record<string, unknown>[]>>();
    private readonly dropDownCache = new Map<string, Observable<DropdownValue[]>>();
    private readonly executeSubject = new Subject<string>();
    private elementsValue: FormElements[] = [];
    private dataValue: Record<string, unknown> = {};

    @Input()
    public get elements(): FormElements[] {
        return this.elementsValue;
    }

    public set elements(value: FormElements[]) {
        this.elementsValue = value;
        this.applyDefaults();
    }

    @Output()
    public readonly execute = this.executeSubject.asObservable();

    public get fields(): boolean {
        return this.isFields;
    }

    @Input()
    @HostBinding('class.fields')
    public set fields(value: BooleanLike) {
        this.isFields = this.toBoolean(value);
    }

    protected get anyData(): any {
        return this.data;
    }

    @Input()
    public get data(): Record<string, unknown> {
        return this.dataValue ?? {};
    }

    public set data(value: Record<string, unknown>) {
        this.dataValue = value;
        this.applyDefaults();
    }

    @Input()
    public dataSources: DataSourceComponent[] = [];

    public constructor(
        iterableDiffers: IterableDiffers
    ) {
        super(false);
        this.classes.register('elements', 'fields');
        this.elementsDiffer = iterableDiffers.find([]).create(undefined);
    }

    public ngDoCheck(): void {
        if (this.isFields && this.elementsDiffer.diff(this.elements)) {
            this.classes.set('elements', this.fieldClasses[this.elements.length]);
        }
    }

    protected getData(dataSource: string): Observable<Record<string, unknown>[]> {
        const cachedObservable = this.dataCache.get(dataSource);
        if (cachedObservable) {
            return cachedObservable;
        }
        const subject = new ReplaySubject<Record<string, unknown>[]>(1);
        this.dataCache.set(dataSource, subject.asObservable());
        merge(...this.dataSources.map(x => x.get(dataSource)).filter(x => x)).subscribe({
            next: data => subject.next(data),
            error: error => subject.next(error)
        });
        return subject.asObservable();
    }

    protected getItems(dropdown: FormDropDownElement): Observable<DropdownValue[]> {
        const cachedObservable = this.dropDownCache.get(dropdown.dataSource);
        if (cachedObservable) {
            return cachedObservable;
        }
        const subject = new ReplaySubject<DropdownValue[]>(1);
        this.dropDownCache.set(dropdown.dataSource, subject.asObservable());
        this.getData(dropdown.dataSource).subscribe({
            next: data => {
                const values = data?.map(entry => new DropdownValue<unknown>(entry[dropdown.valueField], this.format(entry, dropdown.textField, dropdown.textFieldFormatter)));
                subject.next([
                    ...this.upgradeItems(dropdown.prefixItems),
                    ...values,
                    ...this.upgradeItems(dropdown.postfixItems)
                ]);
            },
            error: error => subject.next(error)
        });
        return subject.asObservable();
    }

    protected onExecute(action: string): void {
        this.executeSubject.next(action);
    }

    private applyDefaults(): void {
        if (!this.data || !this.elements) {
            return;
        }
        for (const element of this.elements as FormDataElement[]) {
            if (element.field && element.defaultValue) {
                this.data[element.field] ??= element.defaultValue;
            }
        }
    }

    private format(entry: Record<string, unknown>, field: string | string[], fieldFormatter?: string): string {
        if (typeof field === 'string') {
            return entry[field]?.toString() ?? '';
        }
        if (fieldFormatter) {
            let result = fieldFormatter;
            const matches = fieldFormatter.matchAll(/[^$]*(?<var>\$+\d+)/gm);
            for (const match of matches) {
                const variable = match?.groups?.['var'];
                if (variable && !variable.startsWith('$$')) {
                    const index = parseInt(variable.replace(/\$/g, ''));
                    result = result.replace(variable, entry[field[index]] as string);
                }
            }
            return result;
        }
        return field.map(x => entry[x]).join(' ');
    }

    private upgradeItems(values: DropdownValue[] | undefined): DropdownValue[] {
        if (!values) {
            return [];
        }
        for (const value of values) {
            value.value ??= undefined;
        }
        return values;
    }

    protected $input(element: FormElements): FormInputElement {
        if (element.elementType === 'input') {
            return element;
        }
        throw new Error(`${element.elementType} can not be casted to 'input'`);
    }

    protected $checkbox(element: FormElements): FormCheckboxElement {
        if (element.elementType === 'checkbox') {
            return element;
        }
        throw new Error(`${element.elementType} can not be casted to 'checkbox'`);
    }

    protected $area(element: FormElements): FormAreaElement {
        if (element.elementType === 'area') {
            return element;
        }
        throw new Error(`${element.elementType} can not be casted to 'area'`);
    }

    protected $dropdown(element: FormElements): FormDropDownElement {
        if (element.elementType === 'dropdown') {
            return element;
        }
        throw new Error(`${element.elementType} can not be casted to 'dropdown'`);
    }

    protected $button(element: FormElements): FormButtonElement {
        if (element.elementType === 'button') {
            return element;
        }
        throw new Error(`${element.elementType} can not be casted to 'button'`);
    }

    protected $label(element: FormElements): FormLabelElement {
        if (element.elementType === 'label') {
            return element;
        }
        throw new Error(`${element.elementType} can not be casted to 'label'`);
    }

    protected $fields(element: FormElements): FormFieldGroupElement {
        if (element.elementType === 'fields') {
            return element;
        }
        throw new Error(`${element.elementType} can not be casted to 'fields'`);
    }

    protected $grid(element: FormElements): FormGridElement {
        if (element.elementType === 'grid') {
            return element;
        }
        throw new Error(`${element.elementType} can not be casted to 'grid'`);
    }

    protected $message(element: FormElements): FormMessage | FormWarning | FormInfo | FormError {
        if (element.elementType === 'message' || element.elementType === 'warning' || element.elementType === 'info' || element.elementType === 'error') {
            return element;
        }
        throw new Error(`${element.elementType} can not be casted to 'message'`);
    }

    protected $header(element: FormElements): FormHeader {
        if (element.elementType === 'h1' || element.elementType === 'h2' || element.elementType === 'h3' || element.elementType === 'h4' || element.elementType === 'h5' || element.elementType === 'h6') {
            return element;
        }
        throw new Error(`${element.elementType} can not be casted to 'h1-6'`);
    }
}
