import { Component } from '@angular/core';
import { ButtonComponent } from '@mantic-ui/angular';
import { SemanticUiIconsLocalComponent, SemanticUiLatoLocalComponent, SemanticUiModule, SemanticUiResetComponent, SemanticUiSiteComponent, SemanticUiThemeComponent } from '@mantic-ui/semantic-ui-angular';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-test-example',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss'],
    standalone: true,
    imports: [ButtonComponent, SemanticUiModule, CommonModule, SemanticUiThemeComponent, SemanticUiSiteComponent, SemanticUiResetComponent, SemanticUiLatoLocalComponent, SemanticUiIconsLocalComponent]
})
export class TestExampleComponent {
}

