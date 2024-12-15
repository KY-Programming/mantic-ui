import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AsyncAction, ButtonComponent, FlexComponent, NotificationService, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';
import { HeaderComponent } from '../../components/header/header.component';
import { CustomNotificationComponent } from './custom-notification/custom-notification.component';

@Component({
    selector: 'app-notification-example',
    imports: [CommonModule, HeaderComponent, TabGroupComponent, TabComponent, ExampleComponent, ExampleCodeComponent, FlexComponent, ButtonComponent],
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationExampleComponent {
    protected asyncAction: AsyncAction | undefined;
    private readonly notificationService = inject(NotificationService);

    public readonly example1Html = `<m-flex>
    <m-button (click)="showError()" color="red">Error</m-button>
    <m-button (click)="showWarning()" color="brown">Warning</m-button>
    <m-button (click)="showSuccess()" color="green">Success</m-button>
    <m-button (click)="showInfo()" color="blue">Info</m-button>
    <m-button *ngIf="!asyncAction" (click)="startAsync()">Start Async</m-button>
    <m-button *ngIf="asyncAction" (click)="stopAsync()">Stop Async</m-button>
</m-flex>
<m-notification fromService/>`;

    public readonly example1Ts = `import { NotificationService } from '@mantic-ui/angular';
...
export class DemoComponent {
    protected asyncAction: AsyncAction | undefined;
    private readonly notificationService = inject(NotificationService);

    protected showError(): void {
        this.notificationService.error('Error Text');
    }

    protected showWarning(): void {
        this.notificationService.warning('Warning Text');
    }

    protected showSuccess(): void {
        this.notificationService.success('Success Text');
    }

    protected showInfo(): void {
        this.notificationService.info('Info Text');
    }

    protected startAsync(): void {
        this.asyncAction = this.notificationService.async('Async Info Text', 'Async Done Text');
    }

    protected stopAsync(): void {
        this.asyncAction?.done();
        this.asyncAction = undefined;
    }
}`;

    protected showError(): void {
        this.notificationService.error('Error Text');
    }

    protected showWarning(): void {
        this.notificationService.warning('Warning Text');
    }

    protected showSuccess(): void {
        this.notificationService.success('Success Text');
    }

    protected showInfo(): void {
        this.notificationService.info('Info Text');
    }

    protected startAsync(): void {
        this.asyncAction = this.notificationService.async('Async Info Text', 'Async Done Text');
    }

    protected stopAsync(): void {
        this.asyncAction?.done();
        this.asyncAction = undefined;
    }

    public showComponent(): void {
        this.notificationService.error('Default error message', { component: CustomNotificationComponent });
    }

    public exampleComponent = `import { NotificationService } from '@mantic-ui/angular';

this.notificationService.error('Default error message', {
    component: CustomNotificationComponent
});`;

    public exampleComponentTs = `import { Component, inject } from '@angular/core';
import { ButtonComponent, notificationToken } from '@mantic-ui/angular';

@Component({
    selector: 'app-custom-notification',
    imports: [ButtonComponent],
    template: \`
{{ notification.text }}
<m-button color="red" (click)="onClick($event)">Info</m-button>
    \`
})
export class CustomNotificationComponent {
    protected readonly notification = inject(notificationToken);

    protected onClick(event: MouseEvent): void {
        // Prevent default to avoid close of the message
        event.preventDefault();
        alert('You clicked the button!');
    }
}`;
}
