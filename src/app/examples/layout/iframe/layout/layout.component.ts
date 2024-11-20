import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '@mantic-ui/angular';

@Component({
    selector: 'app-layout-iframe',
    imports: [CommonModule, LayoutComponent],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class SemanticLayoutIframeComponent {

}
