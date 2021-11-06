import { Pipe, PipeTransform } from '@angular/core';
import { ValidationPipe } from './validation.pipe';
import { FormValidation, isFormValidation } from '../models/form-validation';

@Pipe({
  name: 'mAllowedChars'
})
export class AllowedCharsPipe implements ValidationPipe, PipeTransform {

  public transform(value: unknown | FormValidation, allowedChars: string, message?: string): FormValidation {
    const result = isFormValidation(value) ? value : { value, message: undefined, valid: true };
    if (!result.valid) {
      return result;
    }
    result.valid = this.isValid(result.value, allowedChars);
    result.message = result.valid ? undefined : message || 'no valid mail address';
    return result;
  }

  private isValid(value: unknown, allowedChars: string): boolean {
    return typeof value === 'string' && new RegExp(`^${allowedChars}$`).test(value);
  }

}
