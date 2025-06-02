
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent, ButtonDirective, FillDirective, FlexComponent, ModalComponent, ModalFooterComponent, NotificationComponent } from '@mantic-ui/angular';
import { FomanticUiThemeComponent } from '@mantic-ui/fomantic-ui-angular';
import { SemanticUiIconsLocalComponent, SemanticUiLatoLocalComponent, SemanticUiResetComponent, SemanticUiSiteComponent } from '@mantic-ui/semantic-ui-angular';

@Component({
    selector: 'app-fomantic-layout',
    imports: [FlexComponent, FillDirective, RouterOutlet, ModalComponent, ModalFooterComponent, ButtonComponent, ButtonDirective, FomanticUiThemeComponent, SemanticUiSiteComponent, SemanticUiResetComponent, SemanticUiLatoLocalComponent, SemanticUiIconsLocalComponent, NotificationComponent],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class FomanticLayoutComponent {
    public showThemeWarning = true;
}
