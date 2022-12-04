import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'debugger',
    standalone: true
})
export class DebuggerPipe implements PipeTransform {

    public transform(value: unknown, ...args: unknown[]): unknown {
        // eslint-disable-next-line no-debugger
        debugger;
        return value;
    }

}
