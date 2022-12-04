import { Pipe, PipeTransform } from '@angular/core';
import { FormValidation, isFormValidation } from '../models/form-validation';
import { ValidationPipe } from './validation.pipe';

@Pipe({
    name: 'mIsFilled',
    standalone: true
})
export class IsFilledPipe implements ValidationPipe, PipeTransform {
    public transform(value: unknown | FormValidation, message?: string): FormValidation {
        const result = isFormValidation(value) ? value : { value, message: undefined, valid: true };
        if (!result.valid) {
            return result;
        }
        result.valid = !!result.value;
        result.message = result.valid ? undefined : message || 'has to be filled';
        return result;
    }
}
