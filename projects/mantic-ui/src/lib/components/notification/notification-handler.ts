import { Notification } from './notification';

export interface NotificationHandler {
    remove(message: Notification): void;
}
