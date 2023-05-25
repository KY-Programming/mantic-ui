import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderDirective, IconComponent, InfoComponent, InputComponent, MenuComponent, MenuHeaderComponent, MenuItemComponent, MenuLinkComponent, SegmentComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent, ExampleFrameComponent } from '@mantic-ui/angular-doc';

@Component({
    selector: 'app-menu-example',
    standalone: true,
    imports: [CommonModule, HeaderComponent, TabGroupComponent, TabComponent, IconComponent, HeaderDirective, ExampleComponent, ExampleCodeComponent, MenuComponent, MenuLinkComponent, MenuItemComponent, SegmentComponent, InputComponent, MenuHeaderComponent, InfoComponent, ExampleFrameComponent],
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuExampleComponent {

}
