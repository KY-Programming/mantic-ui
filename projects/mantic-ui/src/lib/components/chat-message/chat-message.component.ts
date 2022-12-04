import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { ChatMessage } from '../../models/chat-message';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from '../../directives/button.directive';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'm-chat-message',
    templateUrl: './chat-message.component.html',
    styleUrls: ['./chat-message.component.scss'],
    imports: [
        CommonModule,
        ButtonComponent,
        ButtonDirective,
        RouterLink
    ],
    standalone: true
})
export class ChatMessageComponent {

    @Input()
    public message: ChatMessage;

    @HostBinding('class.in')
    public get in(): boolean {
        return this.message?.direction === 'in';
    }

    @HostBinding('class.out')
    public get out(): boolean {
        return this.message?.direction === 'out';
    }

    @HostBinding('class.grouped')
    public get grouped(): boolean {
        return this.message?.grouped;
    }

    @Output()
    public readonly execute = new EventEmitter<string>();

    public open(url: string): void {
        window.open(url);
    }

    public onExecute(action: string): void {
        this.execute.emit(action);
    }
}
