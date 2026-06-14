import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';

export class DropdownValue<T = unknown> {
    public filtered?: boolean;

    public constructor(
        public value: T,
        public text?: string,
        public icon?: IconType,
        public iconSize?: IconSize
    ) { }
}
