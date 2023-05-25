import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mPadEnd',
    standalone: true
})
export class PadEndPipe implements PipeTransform {
    public transform(value: unknown, maxLength: number, fillString?: string): string | undefined {
        const text = value?.toString();
        return text?.padEnd(maxLength, fillString);
    }
}
