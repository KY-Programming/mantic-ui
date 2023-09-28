import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FillDirective, FlexComponent, NotificationComponent } from '@mantic-ui/angular';
import { SemanticUiIconsLocalComponent, SemanticUiLatoLocalComponent, SemanticUiResetComponent, SemanticUiSiteComponent, SemanticUiThemeComponent } from '@mantic-ui/semantic-ui-angular';

@Component({
    selector: 'app-semantic-layout',
    standalone: true,
    imports: [CommonModule, FlexComponent, FillDirective, RouterOutlet, SemanticUiThemeComponent, SemanticUiSiteComponent, SemanticUiResetComponent, SemanticUiLatoLocalComponent, SemanticUiIconsLocalComponent, NotificationComponent],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class SemanticLayoutComponent {

}
