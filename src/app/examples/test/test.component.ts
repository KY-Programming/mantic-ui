import { Component } from '@angular/core';
import { SemanticUiIconsLocalComponent, SemanticUiLatoLocalComponent, SemanticUiResetComponent, SemanticUiSiteComponent, SemanticUiThemeComponent } from '@mantic-ui/semantic-ui-angular';

@Component({
    selector: 'app-test-example',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss'],
    imports: [SemanticUiThemeComponent, SemanticUiSiteComponent, SemanticUiResetComponent, SemanticUiLatoLocalComponent, SemanticUiIconsLocalComponent]
})
export class TestExampleComponent {
}

