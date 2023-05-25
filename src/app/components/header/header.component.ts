import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderDirective } from '@mantic-ui/angular';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, HeaderDirective],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    @Input()
    public header?: string;

    @Input()
    public subHeader?: string;

    @Input()
    public showPlaceholder?: boolean;

}
