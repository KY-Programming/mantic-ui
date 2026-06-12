import { Component, ChangeDetectionStrategy } from '@angular/core';

import { HeaderComponent } from '../../components/header/header.component';
import { HeaderDirective, IconComponent, InfoComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent, ExampleFrameComponent } from '@mantic-ui/angular-doc';

@Component({
    selector: 'app-layout-example',
    imports: [HeaderComponent, TabGroupComponent, TabComponent, ExampleComponent, InfoComponent, ExampleFrameComponent],
    templateUrl: './layout.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./layout.component.scss']
})
export class LayoutExampleComponent {
}
