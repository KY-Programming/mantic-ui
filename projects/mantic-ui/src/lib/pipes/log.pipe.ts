import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'log',
    })
export class LogPipe implements PipeTransform {

    public transform<T>(value: T, ...args: unknown[]): T {
        if (args && args.length > 0) {
            console.log(args[0], value);
        } else {
            console.log(value);
        }
        return value;
    }

}
