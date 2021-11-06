import { Pipe, PipeTransform } from '@angular/core';
import { FormGridElement } from '../../form-renderer/form-layout';

@Pipe({
    name: 'mAsGrid'
})
export class AsGridPipe implements PipeTransform {

    public transform(value: unknown): FormGridElement {
        return value as FormGridElement;
    }

}
