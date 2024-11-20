import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ButtonDirective } from '../../../directives/button.directive';

@Component({
    selector: 'm-file-input',
    templateUrl: './file-input.component.html',
    styleUrls: ['./file-input.component.scss'],
    imports: [
        ButtonDirective
    ]
})
export class FileInputComponent {
    public readonly id = `file_input_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

    @ViewChild('input')
    public input: ElementRef<HTMLInputElement> | undefined;

    public get files(): FileList | undefined {
        return this.input?.nativeElement.files ?? undefined;
    }

    @Input()
    public accept: string | undefined;

    @Output()
    public readonly change = new EventEmitter<Event>();

}
