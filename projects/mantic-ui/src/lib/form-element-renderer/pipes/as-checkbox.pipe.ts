import { Pipe, PipeTransform } from '@angular/core';
import { FormCheckboxElement } from '../../form-renderer/form-layout';

@Pipe({
    name: 'mAsCheckbox'
})
export class AsCheckboxPipe implements PipeTransform {

    transform(value: unknown): FormCheckboxElement {
        return value as FormCheckboxElement;
    }

}
