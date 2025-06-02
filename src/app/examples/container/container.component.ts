import { Component } from '@angular/core';

import { HeaderComponent } from '../../components/header/header.component';
import { HeaderDirective, IconComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';

@Component({
    selector: 'app-container-example',
    imports: [HeaderComponent, TabGroupComponent, TabComponent, ExampleComponent],
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss']
})
export class ContainerExampleComponent {

}
