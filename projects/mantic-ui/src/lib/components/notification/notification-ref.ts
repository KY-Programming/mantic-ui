import { Notification } from './notification';
import { NotificationHandler } from './notification-handler';

export class NotificationRef<T = unknown> {
    public constructor(
        public readonly notification: Notification<T>,
        private readonly handler: NotificationHandler
    ) {
    }

    public close(): void {
        this.handler.remove(this.notification);
    }
}
