import { Pipe, PipeTransform } from '@angular/core';
import { localize } from '../components/localize/localize';
import { mantic } from '../helpers/mantic';
import { FormValidation, isFormValidation } from '../models/form-validation';
import { ValidationPipe } from './validation.pipe';

@Pipe({
    name: 'mAllowedChars',
    })
export class AllowedCharsPipe implements ValidationPipe, PipeTransform {

    public transform(value: unknown | FormValidation, allowedChars: string, message?: string): FormValidation {
        const result = isFormValidation(value) ? value : { value, message: undefined, valid: true };
        if (!result.valid) {
            return result;
        }
        result.valid = this.isValid(result.value, allowedChars);
        result.message = result.valid ? undefined : message || localize(mantic.pipes.allowedChars.message, `forbidden characters found`);
        return result;
    }

    private isValid(value: unknown, allowedChars: string): boolean {
        return typeof value === 'string' && new RegExp(`^${allowedChars}$`).test(value);
    }

}
