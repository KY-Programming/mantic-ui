import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { ButtonComponent, DividerComponent, HeaderDirective, IconComponent, SegmentComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';

@Component({
    selector: 'app-divider-example',
    standalone: true,
    imports: [CommonModule, HeaderComponent, TabGroupComponent, TabComponent, IconComponent, HeaderDirective, ExampleComponent, ExampleCodeComponent, DividerComponent, SegmentComponent, ButtonComponent],
    templateUrl: './divider.component.html',
    styleUrls: ['./divider.component.scss']
})
export class DividerExampleComponent {

}
