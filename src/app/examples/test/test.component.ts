import { Component } from '@angular/core';
import { ButtonComponent } from '@mantic-ui/angular';
import { SemanticUiModule } from '@mantic-ui/semantic-ui-angular';

@Component({
    selector: 'app-test-example',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss'],
    standalone: true,
    imports: [
        ButtonComponent,
        SemanticUiModule
    ]
})
export class TestExampleComponent {

}
