import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ChatComponent, ChatMessage, HeaderDirective, IconComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';

import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-chat',
    imports: [HeaderComponent, TabGroupComponent, TabComponent, ChatComponent],
    templateUrl: './chat.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./chat.component.scss']
})
export class ChatExampleComponent implements OnInit {
    public messages: ChatMessage[] = [];

    public ngOnInit(): void {
        this.messages.push({ direction: 'in', sender: 'Someone', text: 'Some incoming message' });
        this.messages.push({ direction: 'out', sender: 'You', text: 'Some message from you' });
        this.messages.push({ direction: 'in', sender: 'Jenny', text: 'A message with a picture of its sender', image: 'assets/images/avatar/small/jenny.jpg' });
        this.messages.push({ direction: 'in', sender: 'Jenny', text: 'A grouped message keeps the picture\'s space free', image: 'assets/images/avatar/small/jenny.jpg', grouped: true });
        this.messages.push({ direction: 'out', sender: 'You', text: 'Your own picture is on the right', image: 'assets/images/avatar/small/matt.jpg' });
    }

}
