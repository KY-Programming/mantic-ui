import { Pipe, PipeTransform } from '@angular/core';
import { FormDropDownElement } from '../../form-renderer/form-layout';

@Pipe({
  name: 'mAsDropDown'
})
export class AsDropDownPipe implements PipeTransform {

  transform(value: unknown): FormDropDownElement {
    return value as FormDropDownElement;
  }

}
