import { Component } from '@angular/core';

import { HeaderComponent } from '../../components/header/header.component';
import { HeaderDirective, IconComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';
import { LayoutListExamplesComponent } from '../layout-list/layout-list.component';

@Component({
    selector: 'app-layouts-example',
    imports: [HeaderComponent, TabGroupComponent, TabComponent, LayoutListExamplesComponent],
    templateUrl: './layouts.component.html',
    styleUrls: ['./layouts.component.scss']
})
export class LayoutExamplesComponent {

}
