import { Component } from '@angular/core';

import { HeaderComponent } from '../../components/header/header.component';
import { HeaderDirective, IconComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';
import { SpecialListExamplesComponent } from '../special-list/special-list.component';

@Component({
    selector: 'app-specials',
    imports: [HeaderComponent, TabGroupComponent, TabComponent, SpecialListExamplesComponent],
    templateUrl: './specials.component.html',
    styleUrls: ['./specials.component.scss']
})
export class SpecialExamplesComponent {

}
