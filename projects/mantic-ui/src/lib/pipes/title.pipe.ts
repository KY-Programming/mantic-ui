import { Pipe, PipeTransform } from '@angular/core';
import { FormValidation, isFormValidation } from '../models/form-validation';
import { ValidationPipe } from './validation.pipe';

@Pipe({
    name: 'mTitle',
    })
export class TitlePipe implements ValidationPipe, PipeTransform {

    public transform(value: unknown | FormValidation, label?: string): FormValidation {
        if (isFormValidation(value)) {
            value.label = label;
            return value;
        }
        return { valid: true, value, label, message: undefined };
    }

}
