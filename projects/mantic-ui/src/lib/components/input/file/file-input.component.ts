import { Component, ElementRef, EventEmitter, Output, ChangeDetectionStrategy, input, viewChild } from '@angular/core';
import { ButtonDirective } from '../../../directives/button.directive';

@Component({
    selector: 'm-file-input',
    templateUrl: './file-input.component.html',
    styleUrls: ['./file-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        ButtonDirective
    ]
})
export class FileInputComponent {
    public readonly id = `file_input_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

    public readonly input = viewChild<ElementRef<HTMLInputElement>>('input');

    public get files(): FileList | undefined {
        return this.input()?.nativeElement.files ?? undefined;
    }

    public readonly accept = input<string>();

    @Output()
    public readonly change = new EventEmitter<Event>();

}
