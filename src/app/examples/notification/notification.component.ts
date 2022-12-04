import { Component } from '@angular/core';
import { NotificationService } from '@mantic-ui/angular';

@Component({
    selector: 'app-notification-example',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationExampleComponent {

    public readonly example1Html = `<m-flex>
    <m-button (click)="showError()" color="red">Error</m-button>
    <m-button (click)="showWarning()" color="brown">Warning</m-button>
    <m-button (click)="showSuccess()" color="green">Success</m-button>
    <m-button (click)="showInfo()" color="blue">Info</m-button>
</m-flex>
<m-notification fromService></m-notification>`;

    public readonly example1Ts = `import { NotificationService } from '@mantic-ui/angular';
...
export class DemoComponent {
    public constructor(
        private readonly notificationService: NotificationService
    ) {
    }

    public showError(): void {
        this.notificationService.error('Error Text');
    }

    public showWarning(): void {
        this.notificationService.warning('Warning Text');
    }

    public showSuccess(): void {
        this.notificationService.success('Success Text');
    }

    public showInfo(): void {
        this.notificationService.info('Info Text');
    }
}`;

    public constructor(
        private readonly notificationService: NotificationService
    ) {
    }

    public showError(): void {
        this.notificationService.error('Error Text');
    }

    public showWarning(): void {
        this.notificationService.warning('Warning Text');
    }

    public showSuccess(): void {
        this.notificationService.success('Success Text');
    }

    public showInfo(): void {
        this.notificationService.info('Info Text');
    }
}
