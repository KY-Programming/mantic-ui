
import { ColorName } from '../models/color';
import { InputType } from '../input/text/input.component';

export declare type FormElements = FormInputElement | FormCheckboxElement | FormFieldGroupElement | FormDropDownElement | FormButtonElement | FormGridElement | FormLabelElement;

export interface FormLayout {
    elements: FormElements[];
}

export interface FormDataElement {
    field: string;
}

export interface FormInputElement extends FormDataElement {
    elementType: 'input';
    type?: InputType;
    label?: string;
    readonly?: boolean;
}

export interface FormCheckboxElement extends FormDataElement {
    elementType: 'checkbox';
    label: string;
    readonly?: boolean;
}

export interface FormFieldGroupElement extends FormDataElement {
    elementType: 'fields';
    elements: FormElements[];
}

export interface FormAreaElement extends FormDataElement {
    elementType: 'area';
    label?: string;
    readonly?: boolean;
}

export interface FormDropDownElement extends FormDataElement {
    elementType: 'dropdown';
    label?: string;
    dataSource: string;
    valueField: string;
    textField: string;
    readonly?: boolean;
    allowFreeText?: boolean;
}

export interface FormButtonElement extends FormDataElement {
    elementType: 'button';
    label: string;
    action: string;
    color?: ColorName;
}

export interface FormGridElement extends FormDataElement {
    elementType: 'grid';
    width?: 'equal';
    cells?: FormCellElement[];
}

export interface FormCellElement {
    float?: 'left' | 'right' | undefined;
    align?: 'left' | 'right' | undefined;
    size?: number;
    elements: FormElements[];
}

export interface FormLabelElement extends FormDataElement {
    elementType: 'label';
    label: string;
}
