import { Type } from '@angular/core';
import { IconType } from '../icon/icon-type';

export interface Notification<T = unknown> {
    type: 'positive' | 'success' | 'warning' | 'error' | 'info' | 'none';
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
