import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FillDirective, FlexComponent } from '@mantic-ui/angular';
import { SemanticUiIconsLocalComponent, SemanticUiLatoLocalComponent, SemanticUiResetComponent, SemanticUiSiteComponent, SemanticUiThemeComponent } from '@mantic-ui/semantic-ui-angular';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-semantic-layout',
    standalone: true,
    imports: [CommonModule, FlexComponent, FillDirective, RouterOutlet, SemanticUiThemeComponent, SemanticUiSiteComponent, SemanticUiResetComponent, SemanticUiLatoLocalComponent, SemanticUiIconsLocalComponent],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class SemanticLayoutComponent {

}
