import { Component } from '@angular/core';
import { ButtonComponent, MarkdownRendererComponent } from '@mantic-ui/angular';
import { SemanticUiModule } from '@mantic-ui/semantic-ui-angular';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ComponentParser } from '../../../../projects/mantic-ui/src/lib/components/dynamic-component/component-parser';
import { ButtonExampleComponent } from '../button/button.component';

@Component({
    selector: 'app-test-example',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss'],
    standalone: true,
    imports: [
        ButtonComponent,
        SemanticUiModule,
        CommonModule,
        NgTemplateOutlet,
        MarkdownRendererComponent
    ]
})
export class TestExampleComponent {
    protected markdown = '# Test\n' +
        '<app-button-example ></app-button-example>\n' +
        '<m-json>{ "test": true }</m-json>\n' +
        '**end**';

    public constructor() {
        ComponentParser.register(ButtonExampleComponent);
    }
}

