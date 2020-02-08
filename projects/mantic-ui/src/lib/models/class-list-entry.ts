export type ClassListEntryAction = (entry: ClassListEntry, value: unknown) => void;

export class ClassListEntry {
    public constructor(
        public readonly key: string,
        public classes: string,
        public isActive: boolean,
        public sort: number,
        // public readonly type: 'string' | 'boolean' = 'string'
        public readonly action: ClassListEntryAction) {
    }
}
