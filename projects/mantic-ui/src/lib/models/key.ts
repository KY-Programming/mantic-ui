export declare type KeyCode = 'Space' | 'Enter' | 'Escape';

export class Key {
    public static readonly space = new Key('Space');
    public static readonly enter = new Key('Enter');
    public static readonly escape = new Key('Escape');

    public constructor(
        public readonly code: string
    ) {
    }

    public is(event: KeyboardEvent): boolean {
        return Key.is(event, this);
    }

    public static is(event: KeyboardEvent, ...keys: (KeyCode | Key)[]): boolean {
        return keys.some(key => event.key === (typeof key === 'string' ? key : key.code));
    }
}
