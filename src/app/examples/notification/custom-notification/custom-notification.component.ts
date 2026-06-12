import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, notificationToken } from '@mantic-ui/angular';

@Component({
    selector: 'app-custom-notification',
    imports: [ButtonComponent],
    templateUrl: './custom-notification.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './custom-notification.component.scss'
})
export class CustomNotificationComponent {
    protected readonly notification = inject(notificationToken);

    protected onClick(event: MouseEvent): void {
        // Prevent default to avoid close of the message
        event.preventDefault();
        alert('You clicked the button!');
    }
}
