import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'debug',
    standalone: true
})
export class DebugPipe implements PipeTransform {

    public transform(value: unknown, ...args: unknown[]): unknown {
        // eslint-disable-next-line no-debugger
        debugger;
        return value;
    }

}
