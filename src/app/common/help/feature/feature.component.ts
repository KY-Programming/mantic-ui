import { Component, ChangeDetectionStrategy } from '@angular/core';

import { HeaderComponent } from '../../../components/header/header.component';
import { HeaderDirective, IconComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';

@Component({
    selector: 'app-feature',
    imports: [HeaderComponent, TabGroupComponent, TabComponent, IconComponent, HeaderDirective],
    templateUrl: './feature.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./feature.component.scss']
})
export class FeatureComponent {

}
