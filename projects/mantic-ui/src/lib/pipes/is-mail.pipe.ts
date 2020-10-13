import { Pipe, PipeTransform } from '@angular/core';
import { FormValidation, isFormValidation } from '../models/form-validation';

@Pipe({
  name: 'mIsMail'
})
export class IsMailPipe implements PipeTransform {

  public transform(value: unknown | FormValidation, ...args: unknown[]): FormValidation {
    if (isFormValidation(value) && !value.valid) {
      return value;
    }
    const valid = isFormValidation(value) ? value.valid && this.isMail(value.value) : this.isMail(value);
    return {
      valid,
      message: valid ? undefined : args[0] as string || 'no valid mail address',
      value
    };
  }

  private isMail(value: unknown): boolean {
    return typeof value === 'string' && /^[^@]+@[^@]+\.[a-zA-Z0-9]+$/.test(value);
  }

}
