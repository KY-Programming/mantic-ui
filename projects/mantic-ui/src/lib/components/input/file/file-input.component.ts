import { Component, computed, ElementRef, input, output, viewChild } from '@angular/core';
import { ButtonDirective } from '../../button/button.directive';

@Component({
    selector: 'm-file-input',
    templateUrl: './file-input.component.html',
    styleUrls: ['./file-input.component.scss'],
    imports: [ButtonDirective]
})
export class FileInputComponent {
    public readonly id = `file_input_${Date.now().toString()}_${Math.floor(Math.random() * 1_000_000).toString()}`;
    public readonly input = viewChild<ElementRef<HTMLInputElement>>('input');
    public readonly files = computed(() => this.input()?.nativeElement.files ?? undefined);
    public readonly accept = input<string>();
    // eslint-disable-next-line @angular-eslint/no-output-native
    public readonly change = output<Event>();

}
