import { Component, ChangeDetectionStrategy } from '@angular/core';

import { HeaderComponent } from '../../components/header/header.component';
import { HeaderDirective, IconComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';

@Component({
    selector: 'app-help',
    imports: [HeaderComponent, TabGroupComponent, TabComponent, IconComponent, HeaderDirective],
    templateUrl: './help.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./help.component.scss']
})
export class HelpComponent {

}
