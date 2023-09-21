import { IconType } from '../icon/icon-type';

export interface Notification {
    type: 'positive' | 'success' | 'warning' | 'error' | 'info' | 'none';
    title?: string;
    text: string;
    timeout?: number;
    closeable?: boolean;
    group?: string;
    icon?: IconType;
    loading?: boolean;
}
