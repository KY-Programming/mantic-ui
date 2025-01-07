import { Type } from '@angular/core';
import { IconType } from '../icon/icon-type';
import { NotificationType } from './notification-type';

export interface Notification<T = unknown> {
    type: NotificationType;
    title?: string;
    text?: string;
    timeout?: number;
    closeable?: boolean;
    group?: string;
    icon?: IconType;
    loading?: boolean;
    component?: Type<unknown>;
    details?: T;
}

