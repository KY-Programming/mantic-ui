import { Component } from '@angular/core';

import { HeaderComponent } from '../../components/header/header.component';
import { HeaderDirective, IconComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';
import { UtilListExamplesComponent } from '../util-list/util-list.component';

@Component({
    selector: 'app-utils',
    imports: [HeaderComponent, TabGroupComponent, TabComponent, UtilListExamplesComponent],
    templateUrl: './utils.component.html',
    styleUrls: ['./utils.component.scss']
})
export class UtilExamplesComponent {

}
