import { Pipe, PipeTransform } from '@angular/core';
import { localize } from '../components/localize/localize';
import { mantic } from '../helpers/mantic';
import { FormValidation, isFormValidation } from '../models/form-validation';
import { ValidationPipe } from './validation.pipe';

@Pipe({
    name: 'mIsFilled',
    })
export class IsFilledPipe implements ValidationPipe, PipeTransform {
    public transform(value: unknown | FormValidation, message?: string): FormValidation {
        const result = isFormValidation(value) ? value : { value, message: undefined, valid: true };
        if (!result.valid) {
            return result;
        }
        result.valid = !!result.value;
        result.message = result.valid ? undefined : message || localize(mantic.pipes.isFilled.message, `has to be filled`);
        return result;
    }
}
