import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mRound',
    standalone: true
})
export class RoundPipe implements PipeTransform {

    public transform(value: number, decimals = 0): number {
        const factor = Math.pow(10, decimals);
        return Math.round(value * factor) / factor;
    }

}
