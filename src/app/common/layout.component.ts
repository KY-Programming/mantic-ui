import { Component } from '@angular/core';

import { FillDirective, FlexComponent } from '@mantic-ui/angular';
import { SemanticUiModule } from '@mantic-ui/semantic-ui-angular';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-common-layout',
    imports: [SemanticUiModule, FillDirective, FlexComponent, RouterOutlet],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class CommonLayoutComponent {

}
