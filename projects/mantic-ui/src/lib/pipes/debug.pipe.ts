import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'debug',
    })
export class DebugPipe implements PipeTransform {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- accepts arguments, so `value | debug:anything` compiles; they show up in the debugger
    public transform(value: unknown, ...args: unknown[]): unknown {
        // eslint-disable-next-line no-debugger
        debugger;
        return value;
    }

}
