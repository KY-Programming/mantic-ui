import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FillDirective, FlexComponent } from '@mantic-ui/angular';
import { SemanticUiIconsLocalComponent, SemanticUiLatoLocalComponent, SemanticUiResetComponent, SemanticUiSiteComponent, SemanticUiThemeComponent } from '@mantic-ui/semantic-ui-angular';

@Component({
    selector: 'app-common-layout',
    imports: [FillDirective, FlexComponent, RouterOutlet, SemanticUiThemeComponent, SemanticUiSiteComponent, SemanticUiResetComponent, SemanticUiLatoLocalComponent, SemanticUiIconsLocalComponent],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class CommonLayoutComponent {

}
