import { Component, ChangeDetectionStrategy } from '@angular/core';

import { LayoutComponent } from '@mantic-ui/angular';

@Component({
    selector: 'app-layout-iframe',
    imports: [LayoutComponent],
    templateUrl: './layout.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./layout.component.scss']
})
export class SemanticLayoutIframeComponent {

}
