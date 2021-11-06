import { Pipe, PipeTransform } from '@angular/core';
import { FormLabelElement } from '../../form-renderer/form-layout';

@Pipe({
    name: 'mAsLabel'
})
export class AsLabelPipe implements PipeTransform {

    public transform(value: unknown): FormLabelElement {
        return value as FormLabelElement;
    }

}
