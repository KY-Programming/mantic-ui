export class Timespan {
    public static readonly hoursInDay = 24;

    public static readonly minutesInHour = 60;
    public static readonly minutesInDay = this.minutesInHour * this.hoursInDay;

    public static readonly secondsInMinute = 60;
    public static readonly secondsInHour = this.secondsInMinute * this.minutesInHour;
    public static readonly secondsInDay = this.secondsInMinute * this.minutesInDay;

    public static readonly millisecondsInSecond = 1000;
    public static readonly millisecondsInMinute = this.millisecondsInSecond * this.secondsInMinute;
    public static readonly millisecondsInHour = this.millisecondsInSecond * this.secondsInHour;
    public static readonly millisecondsInDay = this.millisecondsInSecond * this.secondsInDay;
}
