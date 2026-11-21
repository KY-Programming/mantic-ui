import { Component, inject } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderDirective, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
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
    protected readonly prefix = inject(FrameworkService).prefix;
}
