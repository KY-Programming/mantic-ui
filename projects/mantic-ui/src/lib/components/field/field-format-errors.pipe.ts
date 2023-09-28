import { Pipe, PipeTransform } from '@angular/core';
import { FormError } from '../../models/form-error';

@Pipe({
    name: 'fieldFormatErrors',
    standalone: true
})
export class FieldFormatErrorsPipe implements PipeTransform {

    public transform(errors: FormError[]): string {
        return errors.map(error => error.label + ' ' + error.message).join('\n');
    }

}
