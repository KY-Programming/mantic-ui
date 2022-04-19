import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'app-element-list',
    templateUrl: './element-list.component.html',
    styleUrls: ['./element-list.component.scss']
})
export class SemanticElementListComponent {

    @HostBinding('class.component-grid')
    public readonly host = true;

    public prevent(event: MouseEvent): void {
        event.stopPropagation();
        event.preventDefault();
    }

}
