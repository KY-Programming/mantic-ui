export class ObjectHelper {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    public static clone<T>(value: T): T {
        return JSON.parse(JSON.stringify(value)) as T;
    }
}
