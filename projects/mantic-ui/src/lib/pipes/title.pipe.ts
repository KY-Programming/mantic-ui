import { Pipe, PipeTransform } from '@angular/core';
import { FormValidation, isFormValidation } from '../models/form-validation';

@Pipe({
  name: 'mTitle'
})
export class TitlePipe implements PipeTransform {

  public transform(value: unknown | FormValidation, ...args: string[]): unknown | FormValidation {
    if (isFormValidation(value)) {
      value.label = args[0];
      return value;
    }
    return { value, label: args[0] };
  }

}
