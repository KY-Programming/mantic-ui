import { Component } from '@angular/core';

import { HeaderComponent } from '../../components/header/header.component';
import { HeaderDirective, IconComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';
import { ElementListExamplesComponent } from '../element-list/element-list.component';
import { RouterLink } from '@angular/router';
import { LayoutListExamplesComponent } from '../layout-list/layout-list.component';
import { SpecialListExamplesComponent } from '../special-list/special-list.component';
import { UtilListExamplesComponent } from '../util-list/util-list.component';

@Component({
    selector: 'app-components',
    imports: [HeaderComponent, TabGroupComponent, TabComponent, HeaderDirective, ElementListExamplesComponent, RouterLink, LayoutListExamplesComponent, SpecialListExamplesComponent, UtilListExamplesComponent],
    templateUrl: './components.component.html',
    styleUrls: ['./components.component.scss']
})
export class ComponentExamplesComponent {

}
