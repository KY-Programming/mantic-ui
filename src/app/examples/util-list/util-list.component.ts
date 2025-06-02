import { Component, HostBinding } from '@angular/core';

import { RouterLink } from '@angular/router';
import { SegmentComponent } from '@mantic-ui/angular';

@Component({
    selector: 'app-util-list',
    imports: [RouterLink, SegmentComponent],
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
