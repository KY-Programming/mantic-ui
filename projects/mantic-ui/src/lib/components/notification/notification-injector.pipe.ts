import { inject, Injector, Pipe, PipeTransform } from '@angular/core';
import { Notification } from './notification';
import { notificationToken } from './notification-token';

@Pipe({
    name: 'notificationInjector'
})
export class NotificationInjectorPipe implements PipeTransform {
    private readonly injector = inject(Injector);

    public transform(message: Notification): Injector {
        return Injector.create({
            parent: this.injector,
            providers: [
                { provide: notificationToken, useValue: message }
            ]
        });
    }

}
