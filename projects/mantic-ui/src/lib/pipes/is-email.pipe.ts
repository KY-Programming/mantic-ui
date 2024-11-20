import { Pipe, PipeTransform } from '@angular/core';
import { localize } from '../components/localize/localize';
import { mantic } from '../helpers/mantic';
import { FormValidation, isFormValidation } from '../models/form-validation';
import { ValidationPipe } from './validation.pipe';

@Pipe({
    name: 'mIsEmail',
    })
export class IsEmailPipe implements ValidationPipe, PipeTransform {

    public transform(value: unknown | FormValidation, message?: string): FormValidation {
        const result = isFormValidation(value) ? value : { value, message: undefined, valid: true };
        if (!result.valid) {
            return result;
        }
        result.valid = this.isEmail(result.value);
        result.message = result.valid ? undefined : message || localize(mantic.pipes.isEmail.message, `no valid email address`);
        return result;
    }

    private isEmail(value: unknown): boolean {
        return typeof value === 'string' && /^[^@]+@[^@]+\.[a-zA-Z0-9]+$/.test(value);
    }

}
