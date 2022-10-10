import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'app-util-list',
    templateUrl: './util-list.component.html',
    styleUrls: ['./util-list.component.scss']
})
export class UtilListExamplesComponent {

    @HostBinding('class.component-grid')
    public readonly host = true;

    public prevent(event: MouseEvent): void {
        event.stopPropagation();
        event.preventDefault();
    }

}
