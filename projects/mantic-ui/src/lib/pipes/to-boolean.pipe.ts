import { Pipe, PipeTransform } from '@angular/core';
import { toBoolean } from '../helpers/to-boolean';
import { BooleanLike } from '../models/boolean-like';

@Pipe({
    name: 'toBoolean'
})
export class ToBooleanPipe implements PipeTransform {
    public transform(value: BooleanLike): boolean {
        return toBoolean(value);
    }
}
