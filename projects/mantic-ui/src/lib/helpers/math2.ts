export class Math2 {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    public static keepInRange(min: number, value: number | undefined, max?: number | undefined): number
    public static keepInRange(min: number | undefined, value: number, max?: number | undefined): number
    public static keepInRange(min: number | undefined, value: number | undefined, max: number): number
    public static keepInRange(min: number | undefined, value: number | undefined, max?: number | undefined): number {
        if (min !== undefined && (value === undefined || value < min)) {
            return min;
        }
        if (max !== undefined && (value === undefined || value > max)) {
            return max;
        }
        return value as number;
    }

    public static sum(values: (number | undefined)[] | undefined): number {
        let sum = 0;
        values?.forEach(value => sum += value ?? 0);
        return sum;
    }

    public static round(value: number, decimals: number): number {
        const factor = Math.pow(10, decimals);
        return Math.round(value * factor) / factor;
    }
}
