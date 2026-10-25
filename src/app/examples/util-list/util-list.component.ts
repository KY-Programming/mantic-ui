import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';

import { RouterLink } from '@angular/router';
import { FillDirective, FlexDirective, HeaderDirective, SegmentComponent } from '@mantic-ui/angular';

@Component({
    selector: 'app-util-list',
    imports: [RouterLink, SegmentComponent, HeaderDirective, FlexDirective, FillDirective],
    templateUrl: './util-list.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
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
