import { Type } from '@angular/core';

export function FormElement(name: string): (_) => void {
    if (!name) {
        throw new Error('FormElement decorator requires a name');
    }
    if (formElements[name]) {
        throw new Error('FormElement ' + name + ' decorator is already registered');
    }
    return function (constructor: Type<unknown>): void {
        formElements[name] = constructor;
    };
}

export const formElements: { [key: string]: Type<unknown> } = {};
