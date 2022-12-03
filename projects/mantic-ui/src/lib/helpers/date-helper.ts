export abstract class DateHelper {
    public static keepInRange(min: Date | undefined, value: Date, max?: Date | undefined): Date {
        if (min !== undefined && value < min) {
            return min;
        }
        if (max !== undefined && value > max) {
            return max;
        }
        return value;
    }

    public static sameDay(left: Date | undefined, right: Date | undefined): boolean {
        if (!left || !right) {
            return false;
        }
        return left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() === right.getDate();
    }
}
