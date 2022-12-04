export declare type FieldSize = '' | 'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight' | 'nine' | 'ten' | 'eleven' | 'twelve' | 'thirteen' | 'fourteen' | 'fifteen' | 'sixteen';

export declare type ParsableFieldSize = FieldSize | number | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | undefined;

export const fieldSizes: FieldSize[] = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen'];

export const parseFieldSize = (size: ParsableFieldSize): FieldSize => {
    const parsedSizeNumber = size ? parseInt(size.toString(), 10) : undefined;
    if (typeof size === 'number' || parsedSizeNumber && !Number.isNaN(parsedSizeNumber)) {
        return fieldSizes[size];
    }
    return size as FieldSize;
};
