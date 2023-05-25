export abstract class DateHelper {
    public static keepInRange(min: Date, value: Date | undefined, max?: Date | undefined): Date
    public static keepInRange(min: Date | undefined, value: Date, max?: Date | undefined): Date
    public static keepInRange(min: Date | undefined, value: Date | undefined, max?: Date): Date
    public static keepInRange(min: Date | undefined, value: Date | undefined, max?: Date | undefined): Date {
        if (min !== undefined && (value === undefined || value < min)) {
            return min;
        }
        if (max !== undefined && (value === undefined || value > max)) {
            return max;
        }
        return value as any;
    }

    public static sameDay(left: Date | undefined, right: Date | undefined): boolean {
        if (!left || !right) {
            return false;
        }
        return left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() === right.getDate();
    }

    public static today(): Date {
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        return today;
    }
}
