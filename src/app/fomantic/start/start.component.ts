import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderDirective, IconComponent, InfoComponent, SegmentComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';

@Component({
    selector: 'app-fomantic-start',
    imports: [CommonModule, HeaderComponent, HeaderDirective, SegmentComponent, InfoComponent],
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss']
})
export class FomanticStartComponent {

}
