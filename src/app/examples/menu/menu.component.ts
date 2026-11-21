import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';

import { HeaderComponent } from '../../components/header/header.component';
import { HeaderDirective, IconComponent, InfoComponent, InputComponent, MenuComponent, MenuHeaderComponent, MenuItemComponent, MenuLinkComponent, SegmentComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent, ExampleFrameComponent } from '@mantic-ui/angular-doc';

@Component({
    selector: 'app-menu-example',
    imports: [HeaderComponent, TabGroupComponent, TabComponent, ExampleComponent, MenuComponent, MenuLinkComponent, MenuItemComponent, SegmentComponent, InputComponent, MenuHeaderComponent, InfoComponent, ExampleFrameComponent],
    templateUrl: './menu.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./menu.component.scss']
})
export class MenuExampleComponent {
    protected readonly prefix = inject(FrameworkService).prefix;
}
