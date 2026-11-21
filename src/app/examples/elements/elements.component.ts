import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ElementListExamplesComponent } from '../element-list/element-list.component';

@Component({
    selector: 'app-elements',
    imports: [HeaderComponent, TabGroupComponent, TabComponent, ElementListExamplesComponent],
    templateUrl: './elements.component.html',
    styleUrls: ['./elements.component.scss']
})
export class ElementExamplesComponent {}
