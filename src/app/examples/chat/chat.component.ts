import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ChatComponent, ChatMessage, ContextMenuItemComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';

import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-chat',
    imports: [HeaderComponent, TabGroupComponent, TabComponent, ChatComponent, ContextMenuItemComponent, ExampleComponent, ExampleCodeComponent],
    templateUrl: './chat.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./chat.component.scss']
})
export class ChatExampleComponent implements OnInit {
    public messages: ChatMessage[] = [];
    public isCapturing = false;

    public readonly imagesCode = `<m-chat [messages]="messages()" sender="You" canAttachImages canTakeScreenshots canTakePhotos [screenshotMaxSize]="1280"
        [style.visibility]="isCapturing() ? 'hidden' : null" (capturing)="isCapturing.set($event)" (send)="onSend($event)" #chat>
    <m-context-menu-item icon="user" (click)="attachSample(chat)">Sample picture</m-context-menu-item>
</m-chat>

// ChatMessage.images carries the attached images: { url (data: URL), name, file }, already shrunk to
// imageMaxSize (longest side, default 1920) and re-encoded as WebP with imageQuality (default 0.85).
// screenshotMaxSize and photoMaxSize/-Quality override them for screenshots and photos;
// screenshotQuality defaults to 1 (lossless WebP), independent of imageQuality.
public async attachSample(chat: ChatComponent): Promise<void> {
    const response = await fetch('assets/images/avatar/small/jenny.jpg');
    const blob = await response.blob();
    await chat.attach([new File([blob], 'jenny.jpg', { type: blob.type })]);
}`;

    public ngOnInit(): void {
        this.messages.push(
            { direction: 'in', sender: 'Someone', text: 'Some incoming message' },
            { direction: 'out', sender: 'You', text: 'Some message from you' },
            { direction: 'in', sender: 'Jenny', text: 'A message with a picture of its sender', image: 'assets/images/avatar/small/jenny.jpg' },
            { direction: 'in', sender: 'Jenny', text: 'A grouped message keeps the picture\'s space free', image: 'assets/images/avatar/small/jenny.jpg', grouped: true },
            { direction: 'out', sender: 'You', text: 'Your own picture is on the right', image: 'assets/images/avatar/small/matt.jpg' },
            { direction: 'in', sender: 'Someone', text: 'A message with an image', images: [{ url: 'assets/images/avatar/large/rachel.png', name: 'rachel.png', width: 800, height: 800 }] }
        );
    }

    public async attachSample(chat: ChatComponent): Promise<void> {
        const response = await fetch('assets/images/avatar/small/jenny.jpg');
        const blob = await response.blob();
        await chat.attach([new File([blob], 'jenny.jpg', { type: blob.type })]);
    }
}
