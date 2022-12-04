import { Pipe, PipeTransform } from '@angular/core';
import { FormValidation, isFormValidation } from '../models/form-validation';
import { ValidationPipe } from './validation.pipe';

@Pipe({
    name: 'mIsMail',
    standalone: true
})
export class IsMailPipe implements ValidationPipe, PipeTransform {

    public transform(value: unknown | FormValidation, message?: string): FormValidation {
        const result = isFormValidation(value) ? value : { value, message: undefined, valid: true };
        if (!result.valid) {
            return result;
        }
        result.valid = this.isMail(result.value);
        result.message = result.valid ? undefined : message || 'no valid mail address';
        return result;
    }

    private isMail(value: unknown): boolean {
        return typeof value === 'string' && /^[^@]+@[^@]+\.[a-zA-Z0-9]+$/.test(value);
    }

}
