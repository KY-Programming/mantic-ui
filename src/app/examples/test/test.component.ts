
import { Component } from '@angular/core';
import { ButtonComponent } from '@mantic-ui/angular';
import { SemanticUiIconsLocalComponent, SemanticUiLatoLocalComponent, SemanticUiModule, SemanticUiResetComponent, SemanticUiSiteComponent, SemanticUiThemeComponent } from '@mantic-ui/semantic-ui-angular';

@Component({
    selector: 'app-test-example',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss'],
    imports: [SemanticUiModule, SemanticUiThemeComponent, SemanticUiSiteComponent, SemanticUiResetComponent, SemanticUiLatoLocalComponent, SemanticUiIconsLocalComponent]
})
export class TestExampleComponent {
}

