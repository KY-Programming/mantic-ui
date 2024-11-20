import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mArray'
})
export class ArrayPipe implements PipeTransform {

    public transform(length: number): number[] {
        return new Array(Math.round(length)).fill(0).map((_, index) => index);
    }

}
