export class DateHelper {
  private constructor() {}

  public static keepInRange(min: Date | undefined, value: Date, max?: Date | undefined): Date {
    if (min !== undefined && value < min) {
      return min;
    }
    if (max !== undefined && value > max) {
      return max;
    }
    return value;
  }
}
