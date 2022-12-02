import { Pipe, PipeTransform } from '@angular/core';
import { FormInputElement } from '../../form-renderer/form-layout';

@Pipe({
    name: 'mAsInput'
})
export class AsInputPipe implements PipeTransform {

    public transform(value: unknown): FormInputElement {
        return value as FormInputElement;
    }

}
