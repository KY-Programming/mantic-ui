import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'm-file-input',
    templateUrl: './file-input.component.html',
    styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent {
    public readonly id = `file_input_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

    @Input()
    public accept: string;

    @Output()
    public readonly change = new EventEmitter<Event>();

}
