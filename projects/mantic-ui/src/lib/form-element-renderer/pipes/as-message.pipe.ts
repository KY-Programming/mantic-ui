import { Pipe, PipeTransform } from '@angular/core';
import { FormMessageBase } from '../../form-renderer/form-layout';

@Pipe({
    name: 'mAsMessage'
})
export class AsMessagePipe implements PipeTransform {

    public transform(value: unknown): FormMessageBase {
        return value as FormMessageBase;
    }

}
