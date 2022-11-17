import { Component } from '@angular/core';

@Component({
    selector: 'app-textarea-example',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss']
})
export class TextareaExampleComponent {
    public textCode = `<m-textarea placeholder="Enter a long text..."></m-textarea>`;
    public inverted = `<m-textarea inverted></m-textarea>`;
}
