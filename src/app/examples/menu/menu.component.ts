import { Component } from '@angular/core';

import { HeaderComponent } from '../../components/header/header.component';
import { HeaderDirective, IconComponent, InfoComponent, InputComponent, MenuComponent, MenuHeaderComponent, MenuItemComponent, MenuLinkComponent, SegmentComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent, ExampleFrameComponent } from '@mantic-ui/angular-doc';

@Component({
    selector: 'app-menu-example',
    imports: [HeaderComponent, TabGroupComponent, TabComponent, ExampleComponent, MenuComponent, MenuLinkComponent, MenuItemComponent, SegmentComponent, InputComponent, MenuHeaderComponent, InfoComponent, ExampleFrameComponent],
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuExampleComponent {

}
