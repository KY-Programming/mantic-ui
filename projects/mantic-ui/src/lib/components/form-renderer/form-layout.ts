import { ColorName } from '../../models/color';
import { InputType } from '../input/text/input.component';
import { DropdownValue } from '../dropdown/dropdown-value';

export declare type FormElements = FormInputElement | FormCheckboxElement | FormFieldGroupElement | FormDropDownElement | FormButtonElement | FormGridElement | FormLabelElement | FormMessage | FormWarning | FormInfo | FormError | FormDivider | FormHeader | FormAreaElement;

export interface FormLayout {
    elements: FormElements[];
}

export interface FormDataElement {
    field: string;
    defaultValue?: unknown;
    defaultAction?: string;
    fill?: boolean;
}

export interface FormDataElementWithChildren extends FormDataElement {
    elements: FormElements[];
}

export interface FormInputElement extends FormDataElement {
    elementType: 'input';
    type?: InputType;
    label?: string;
    readonly?: boolean;
    min?: number;
    max?: number;
    zeroText?: string;
}

export interface FormCheckboxElement extends FormDataElement {
    elementType: 'checkbox';
    label: string;
    readonly?: boolean;
}

export interface FormFieldGroupElement extends FormDataElementWithChildren {
    elementType: 'fields';
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
    textField: string | string[];
    textFieldFormatter?: string;
    readonly?: boolean;
    allowFreeText?: boolean;
    prefixItems?: DropdownValue[];
    postfixItems?: DropdownValue[];
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

export interface FormCellElement extends FormDataElementWithChildren {
    float?: 'left' | 'right' | undefined;
    align?: 'left' | 'right' | undefined;
    size?: number;
}

export interface FormLabelElement extends FormDataElement {
    elementType: 'label';
    label: string;
}

export interface FormMessageBase extends FormDataElement {
    header: string;
    text: string;
}

export interface FormMessage extends FormMessageBase {
    elementType: 'message';
}

export interface FormWarning extends FormMessageBase {
    elementType: 'warning';
}

export interface FormInfo extends FormMessageBase {
    elementType: 'info';
}

export interface FormError extends FormMessageBase {
    elementType: 'error';
}

export interface FormDivider extends FormDataElement {
    elementType: 'divider';
}

export interface FormHeader extends FormDataElement {
    elementType: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    text: string;
    dividing?: boolean;
}
