import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderDirective, IconComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';

@Component({
    selector: 'app-help',
    standalone: true,
    imports: [CommonModule, HeaderComponent, TabGroupComponent, TabComponent, IconComponent, HeaderDirective],
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.scss']
})
export class HelpComponent {

}
