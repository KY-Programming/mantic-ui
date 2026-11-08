import { Component, ChangeDetectionStrategy } from '@angular/core';

import { HeaderComponent } from '../../components/header/header.component';
import { ButtonComponent, FlexComponent, HeaderDirective, IconComponent, SegmentComponent, TabComponent, TabGroupComponent, TextareaComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';

@Component({
    selector: 'app-textarea-example',
    imports: [HeaderComponent, TabGroupComponent, TabComponent, ExampleComponent, ExampleCodeComponent, TextareaComponent, SegmentComponent, FlexComponent, ButtonComponent],
    templateUrl: './textarea.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./textarea.component.scss']
})
export class TextareaExampleComponent {
    public textCode = `<m-textarea placeholder="Enter a long text..."></m-textarea>`;
    public standardCode = `<m-textarea>
    <textarea rows="2" placeholder="Only two rows high..." #textarea></textarea>
</m-textarea>`;
    public attachedCode = `<m-flex column>
  <m-textarea attachedTop placeholder="Comment..." />
  <m-button attachedBottom>Send</m-button>
</m-flex>`;
    public inverted = `<m-textarea inverted></m-textarea>`;
}
