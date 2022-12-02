import { IconType } from '../icon/icon-type';
import { IconSize } from '../icon/icon-size';

export class DropdownValue<T = unknown> {
    public filtered?: boolean;

    public constructor(
        public value: T,
        public text?: string,
        public icon?: IconType,
        public iconSize?: IconSize
    ) {

    }
}
