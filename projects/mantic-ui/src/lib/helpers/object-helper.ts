export class ObjectHelper {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    public static clone<T>(value: T): T {
        return JSON.parse(JSON.stringify(value)) as T;
    }

    public static get<T = unknown>(object: Record<string, unknown> | undefined, path: string | string[]): T | undefined {
        const pathArray = typeof path === 'string' ? path.split('.') : path;
        return pathArray.length > 1 ? this.get<T>(object?.[pathArray[0]] as Record<string, unknown> | undefined, pathArray.slice(1)) : object?.[pathArray[0]] as T;
    }

    /*
     * Checks if the object has all specified keys. This is like a typesafe version of the `in` operator
     */
    public static has<T>(value: unknown, ...keys: (keyof T)[]): value is T {
        // eslint-disable-next-line no-restricted-syntax
        return !!value && typeof value === 'object' && keys.every(key => key in value);
    }

    /*
     * Checks if the object has any of the specified keys. This is like a typesafe version of the `in` operator
     */
    public static hasSome<T>(value: unknown, ...keys: (keyof T)[]): value is T {
        // eslint-disable-next-line no-restricted-syntax
        return !!value && typeof value === 'object' && keys.some(key => key in value);
    }
}
