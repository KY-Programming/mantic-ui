import { Component } from '@angular/core';

import { HeaderComponent } from '../../components/header/header.component';
import { HeaderDirective, IconComponent, SegmentComponent, TabComponent, TabGroupComponent, TextareaComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';

@Component({
    selector: 'app-textarea-example',
    imports: [HeaderComponent, TabGroupComponent, TabComponent, ExampleComponent, ExampleCodeComponent, TextareaComponent, SegmentComponent],
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss']
})
export class TextareaExampleComponent {
    public textCode = `<m-textarea placeholder="Enter a long text..."></m-textarea>`;
    public inverted = `<m-textarea inverted></m-textarea>`;
}
