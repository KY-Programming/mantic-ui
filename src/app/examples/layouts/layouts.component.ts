import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderDirective, IconComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';
import { LayoutListExamplesComponent } from '../layout-list/layout-list.component';

@Component({
    selector: 'app-layouts-example',
    standalone: true,
    imports: [CommonModule, HeaderComponent, TabGroupComponent, TabComponent, IconComponent, HeaderDirective, ExampleComponent, ExampleCodeComponent, LayoutListExamplesComponent],
    templateUrl: './layouts.component.html',
    styleUrls: ['./layouts.component.scss']
})
export class LayoutExamplesComponent {

}
