import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'app-layout-list',
    templateUrl: './layout-list.component.html',
    styleUrls: ['./layout-list.component.scss']
})
export class SemanticLayoutListComponent {

    @HostBinding('class.component-grid')
    public readonly host = true;

    public prevent(event: MouseEvent): void {
        event.stopPropagation();
        event.preventDefault();
    }

}
