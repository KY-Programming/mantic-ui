import { Pipe, PipeTransform } from '@angular/core';
import { FormAreaElement } from '../../form-renderer/form-layout';

@Pipe({
    name: 'mAsArea'
})
export class AsAreaPipe implements PipeTransform {

    transform(value: unknown): FormAreaElement {
        return value as FormAreaElement;
    }

}
