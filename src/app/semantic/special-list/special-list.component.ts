import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'app-special-list',
    templateUrl: './special-list.component.html',
    styleUrls: ['./special-list.component.scss']
})
export class SemanticSpecialListComponent {
    public showDimmer = true;
    public showModal = false;

    @HostBinding('class.component-grid')
    public readonly host = true;

    public prevent(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
    }
}
