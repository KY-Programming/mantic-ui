import { Type } from '@angular/core';
import { FormRendererService } from '../form-renderer/form-renderer.service';

/*
    @deprecated Use provideFormElement(...) instead
 */
export function FormElement(name: string): (constructor: Type<unknown>) => void {
    if (!name) {
        throw new Error('FormElement decorator requires a name');
    }
    if (FormRendererService.formElements[name]) {
        throw new Error('FormElement ' + name + ' decorator is already registered');
    }
    return function (constructor: Type<any>) {
        FormRendererService.formElements[name] = constructor;
    };
}
