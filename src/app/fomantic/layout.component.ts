import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, ButtonDirective, FillDirective, FlexComponent, ModalComponent, ModalFooterComponent } from '@mantic-ui/angular';
import { RouterOutlet } from '@angular/router';
import { FomanticUiThemeComponent } from '@mantic-ui/fomantic-ui-angular';
import { SemanticUiIconsLocalComponent, SemanticUiLatoLocalComponent, SemanticUiResetComponent, SemanticUiSiteComponent } from '@mantic-ui/semantic-ui-angular';

@Component({
    selector: 'app-fomantic-layout',
    standalone: true,
    imports: [CommonModule, FlexComponent, FillDirective, RouterOutlet, ModalComponent, ModalFooterComponent, ButtonComponent, ButtonDirective, FomanticUiThemeComponent, SemanticUiSiteComponent, SemanticUiResetComponent, SemanticUiLatoLocalComponent, SemanticUiIconsLocalComponent],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class FomanticLayoutComponent {
    public showThemeWarning = true;
}
