import { Pipe, PipeTransform } from '@angular/core';
import { FormFieldGroupElement } from '../../form-renderer/form-layout';

@Pipe({
  name: 'mAsFields'
})
export class AsFieldsPipe implements PipeTransform {

  public transform(value: unknown): FormFieldGroupElement {
    return value as FormFieldGroupElement;
  }

}
