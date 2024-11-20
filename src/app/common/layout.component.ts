import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FillDirective, FlexComponent } from '@mantic-ui/angular';
import { SemanticUiModule } from '@mantic-ui/semantic-ui-angular';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-common-layout',
    imports: [CommonModule, SemanticUiModule, FillDirective, FlexComponent, RouterOutlet],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class CommonLayoutComponent {

}
