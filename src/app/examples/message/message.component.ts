import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { ErrorComponent, HeaderDirective, IconComponent, InfoComponent, MessageComponent, TabComponent, TabGroupComponent, WarningComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';

@Component({
    selector: 'app-message-example',
    standalone: true,
    imports: [CommonModule, HeaderComponent, TabGroupComponent, TabComponent, IconComponent, HeaderDirective, ExampleComponent, ExampleCodeComponent, MessageComponent, WarningComponent, InfoComponent, ErrorComponent],
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageExampleComponent {
    public readonly messageCode = `<m-message header="Changes in Service">
    We just updated our privacy policy here to better service our customers.
    We recommend reviewing the changes.
</m-message>`;

    public readonly warningCode = `<m-warning header="You must register before you can do that!">
    Visit our registration page, then try again
</m-warning>`;

    public readonly infoCode = `<m-info header="Was this what you wanted?">
    <ul class="list">
        <li>It's good to see you again.</li>
        <li>Did you know it's been a while?</li>
    </ul>
</m-info>`;

    public readonly errorCode = `<m-error header="We're sorry we can't apply that discount">
    That offer has expired
</m-error>`;

}
