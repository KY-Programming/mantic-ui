import { signal } from '@angular/core';
import { IconType } from '../icon/models/icon-type';

/** The lock of readonly fields, shared by the inputs, `m-textarea` and `m-dropdown`; set with `m-input-defaults` */
export const readonlyDefaults = {
    icon: signal<IconType>('lock'),
    text: signal('Read only'),
    /** A form that is readonly as a whole gets calmer without the locks; the background still marks the fields */
    isIconShown: signal(true)
};
