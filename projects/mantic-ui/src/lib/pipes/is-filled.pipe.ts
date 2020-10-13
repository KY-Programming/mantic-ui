import { Pipe, PipeTransform } from '@angular/core';
import { FormValidation, isFormValidation } from '../models/form-validation';
import { ValidationPipe } from './validation.pipe';

@Pipe({
  name: 'mIsFilled'
})
export class IsFilledPipe implements ValidationPipe, PipeTransform {
  public transform(value: unknown | FormValidation, ...args: unknown[]): FormValidation {
    if (isFormValidation(value) && !value.valid) {
      return value;
    }
    return {
      valid: !!value,
      message: value ? undefined : args[0] as string || 'has to be filled',
      value
    };
  }
}
