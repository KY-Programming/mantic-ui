import { Component, OnInit } from '@angular/core';
import { ChatComponent, ChatMessage, HeaderDirective, IconComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-chat',
    imports: [CommonModule, HeaderComponent, TabGroupComponent, TabComponent, ChatComponent],
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatExampleComponent implements OnInit {
    public messages: ChatMessage[] = [];

    public ngOnInit(): void {
        this.messages.push({ direction: 'in', sender: 'Someone', text: 'Some incoming message' });
        this.messages.push({ direction: 'out', sender: 'You', text: 'Some message from you' });
    }

}
