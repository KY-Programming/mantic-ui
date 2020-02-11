export class DropdownValue<T = unknown> {
    public filtered?: boolean;

    public constructor(
        public value: T,
        public text?: string,
        public icon?: string
    ) {

    }
}
