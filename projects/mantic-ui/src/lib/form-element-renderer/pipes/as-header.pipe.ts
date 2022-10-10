import { Pipe, PipeTransform } from '@angular/core';
import { FormHeader } from '../../form-renderer/form-layout';

@Pipe({
    name: 'mAsHeader'
})
export class AsHeaderPipe implements PipeTransform {

    public transform(value: unknown): FormHeader {
        return value as FormHeader;
    }

}
