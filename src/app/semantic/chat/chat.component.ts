import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../../../../projects/mantic-ui/src/lib/models/chat-message';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class SemanticChatComponent implements OnInit {
    public messages: ChatMessage[] = [];

    public ngOnInit(): void {
        this.messages.push({ direction: 'in', sender: 'Someone', text: 'Some incoming message' });
        this.messages.push({ direction: 'out', sender: 'You', text: 'Some message from you' });
    }

}
