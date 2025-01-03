import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mPadStart',
    })
export class PadStartPipe implements PipeTransform {
    public transform(value: unknown, maxLength: number, fillString?: string): string | undefined {
        const text = value?.toString();
        return text?.padStart(maxLength, fillString);
    }
}
