export class Math2 {
    private constructor() {}

    public static keepInRange(min: number | undefined, value: number, max?: number | undefined): number {
        if (min !== undefined && value < min) {
            return min;
        }
        if (max !== undefined && value > max) {
            return max;
        }
        return value;
    }

    public static sum(values: (number | undefined)[] | undefined): number {
        return values ? values.reduce((partialSum, a) => partialSum + (a ?? 0), 0) : 0;
    }
}
