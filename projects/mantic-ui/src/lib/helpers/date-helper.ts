import { Timespan } from './timespan';

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
        return this.sameMonth(left, right) && left.getDate() === right.getDate();
    }

    public static sameWeek(left: Date | undefined, right: Date | undefined): boolean {
        if (!left || !right) {
            return false;
        }
        const leftDayOfYear = Math.floor((left.getTime() - new Date(left.getFullYear(), 0, 0).getTime()) / Timespan.millisecondsInDay);
        const rightDayOfYear = Math.floor((right.getTime() - new Date(right.getFullYear(), 0, 0).getTime()) / Timespan.millisecondsInDay);
        const leftWeekNumber = Math.ceil((leftDayOfYear + 1) / 7);
        const rightWeekNumber = Math.ceil((rightDayOfYear + 1) / 7);
        return leftWeekNumber === rightWeekNumber;
    }

    public static sameMonth(left: Date | undefined, right: Date | undefined): boolean {
        if (!left || !right) {
            return false;
        }
        return this.sameYear(left, right) && left.getMonth() === right.getMonth();
    }

    public static sameYear(left: Date | undefined, right: Date | undefined): boolean {
        if (!left || !right) {
            return false;
        }
        return left.getFullYear() === right.getFullYear();
    }

    public static today(): Date {
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        return today;
    }
}
