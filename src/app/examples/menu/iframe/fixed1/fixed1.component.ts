import { Component } from '@angular/core';

import { MenuComponent, MenuItemComponent, MenuItemDirective } from '@mantic-ui/angular';

@Component({
    selector: 'app-semantic-menu-iframe',
    imports: [MenuComponent, MenuItemComponent, MenuItemDirective],
    templateUrl: './fixed1.component.html',
    styleUrls: ['./fixed1.component.scss']
})
export class SemanticMenuIframeFixed1Component {

}
