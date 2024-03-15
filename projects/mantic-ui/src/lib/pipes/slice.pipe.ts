import { Pipe, PipeTransform } from '@angular/core';

/**
 * Returns a copy of a section of an array.
 * For both start and end, a negative index can be used to indicate an offset from the end of the array.
 * For example, -2 refers to the second to last element of the array.
 * @param start The beginning index of the specified portion of the array.
 * If start is undefined, then the slice begins at index 0.
 * @param end The end index of the specified portion of the array. This is exclusive of the element at the index 'end'.
 * If end is undefined, then the slice extends to the end of the array.
 */
@Pipe({
    name: 'mSlice',
    standalone: true
})
export class SlicePipe implements PipeTransform {
    public transform<T>(array: T[], from?: number, to?: number): T[] {
        return array.slice(from, to);
    }
}
