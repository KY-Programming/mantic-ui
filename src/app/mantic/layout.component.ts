import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FillDirective, FlexComponent, NotificationComponent } from '@mantic-ui/angular';
import { ManticResetComponent, ManticSiteComponent, ManticThemeComponent } from '@mantic-ui/theme';

@Component({
    selector: 'app-mantic-layout',
    imports: [FlexComponent, FillDirective, RouterOutlet, ManticThemeComponent, ManticResetComponent, ManticSiteComponent, NotificationComponent],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class ManticLayoutComponent {}
