import { Math2 } from "../helpers/math2";

export declare type FieldSize = '' | 'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight' | 'nine' | 'ten' | 'eleven' | 'twelve' | 'thirteen' | 'fourteen' | 'fifteen' | 'sixteen';

export declare type ParsableFieldSize = FieldSize
    | number | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16
    | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16'
    | undefined;

export const fieldSizes: FieldSize[] = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen'];

export const parseFieldSize = (size: ParsableFieldSize): FieldSize => {
    if (typeof size === 'number') {
        return fieldSizes[size];
    }
    const parsedSizeNumber = size ? Math2.keepInRange(1, parseInt(size, 10), 16) : undefined;
    return parsedSizeNumber ? fieldSizes[parsedSizeNumber] : (size ?? '') as FieldSize;
};
