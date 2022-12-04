import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mCeil',
    standalone: true
})
export class CeilPipe implements PipeTransform {

    public transform(value: number, decimals = 0): number {
        const factor = Math.pow(10, decimals);
        return Math.ceil(value * factor) / factor;
    }

}
