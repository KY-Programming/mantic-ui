import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { LayoutListExamplesComponent } from '../layout-list/layout-list.component';

@Component({
    selector: 'app-layouts-example',
    imports: [HeaderComponent, TabGroupComponent, TabComponent, LayoutListExamplesComponent],
    templateUrl: './layouts.component.html',
    styleUrls: ['./layouts.component.scss']
})
export class LayoutExamplesComponent {}
