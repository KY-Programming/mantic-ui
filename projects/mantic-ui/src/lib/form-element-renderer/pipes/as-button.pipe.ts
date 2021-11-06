import { Pipe, PipeTransform } from '@angular/core';
import { FormButtonElement } from '../../form-renderer/form-layout';

@Pipe({
  name: 'mAsButton'
})
export class AsButtonPipe implements PipeTransform {

  transform(value: unknown): FormButtonElement {
    return value as FormButtonElement;
  }

}
