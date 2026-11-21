import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'debugger'
})
export class DebuggerPipe implements PipeTransform {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- accepts arguments, so `value | debugger:anything` compiles; they show up in the debugger
    public transform(value: unknown, ...args: unknown[]): unknown {
        // eslint-disable-next-line no-debugger
        debugger;
        return value;
    }

}
