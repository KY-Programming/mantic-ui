import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderDirective, IconComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';
import { ElementListExamplesComponent } from '../element-list/element-list.component';

@Component({
    selector: 'app-elements',
    imports: [CommonModule, HeaderComponent, TabGroupComponent, TabComponent, ElementListExamplesComponent],
    templateUrl: './elements.component.html',
    styleUrls: ['./elements.component.scss']
})
export class ElementExamplesComponent {
}
