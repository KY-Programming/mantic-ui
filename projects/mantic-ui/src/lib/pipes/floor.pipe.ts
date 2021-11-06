import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mFloor'
})
export class FloorPipe implements PipeTransform {

  public transform(value: number, decimals = 0): number {
    const factor = Math.pow(10, decimals);
    return Math.floor(value * factor) / factor;
  }

}
