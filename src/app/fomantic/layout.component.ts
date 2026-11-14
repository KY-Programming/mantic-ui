import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FillDirective, FlexComponent, NotificationComponent } from '@mantic-ui/angular';
import { FomanticUiIconsLocalComponent, FomanticUiLatoLocalComponent, FomanticUiResetComponent, FomanticUiSiteComponent, FomanticUiThemeComponent } from '@mantic-ui/fomantic-ui-angular';

@Component({
    selector: 'app-fomantic-layout',
    imports: [FlexComponent, FillDirective, RouterOutlet, FomanticUiThemeComponent, FomanticUiSiteComponent, FomanticUiResetComponent, FomanticUiLatoLocalComponent, FomanticUiIconsLocalComponent, NotificationComponent],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class FomanticLayoutComponent {}
