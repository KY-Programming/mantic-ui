import { Injectable, Type } from '@angular/core';
import { FormElementBase } from '../form-element-renderer/form-element-base';

@Injectable({
    providedIn: 'root'
})
export class FormRendererService {
    public static readonly formElements: { [key: string]: Type<FormElementBase> } = {};

    public register(type: Type<FormElementBase>, name: string): void {
        if (!name) {
            throw new Error('FormRendererService.register requires a name');
        }
        FormRendererService.formElements[name] = type;
    }

    public get(name: string | undefined): Type<FormElementBase> | undefined {
        return name ? FormRendererService.formElements[name] : undefined;
    }
}
