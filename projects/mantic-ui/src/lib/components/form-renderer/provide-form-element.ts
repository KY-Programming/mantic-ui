import { EnvironmentProviders, makeEnvironmentProviders, Type } from '@angular/core';
import { FormElementBase } from '../form-element-renderer/form-element-base';
import { FormRendererService } from './form-renderer.service';

export function provideFormElement(
    type: Type<FormElementBase>, name: string
): EnvironmentProviders {
    if (!name) {
        throw new Error('provideFormElement requires a name');
    }
    if (FormRendererService.formElements[name]) {
        throw new Error('FormElement ' + name + ' is already registered');
    }
    FormRendererService.formElements[name] = type;
    return makeEnvironmentProviders([]);
}
