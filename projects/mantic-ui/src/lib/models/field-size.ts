export declare type FieldSize = '' | 'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight' | 'nine' | 'ten' | 'eleven' | 'twelve' | 'thirteen' | 'fourteen' | 'fifteen' | 'sixteen';

export declare type ParsableFieldSize = FieldSize | number | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | undefined;

export const fieldSizes: FieldSize[] = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen'];

export const parseFieldSize = (size: ParsableFieldSize): FieldSize => {
    if (typeof size === 'number') {
        return fieldSizes[size];
    }
    if (typeof size === 'string') {
        const parsedSizeNumber = size ? parseInt(size.toString(), 10) : undefined;
        return parsedSizeNumber && !Number.isNaN(parsedSizeNumber) ? fieldSizes[parsedSizeNumber] : '';
    }
    return size ?? '';
};
