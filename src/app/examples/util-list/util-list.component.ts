import { Component, HostBinding, inject } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';
import { RouterLink } from '@angular/router';
import { FillDirective, FlexDirective, HeaderDirective, SegmentComponent } from '@mantic-ui/angular';

@Component({
    selector: 'app-util-list',
    imports: [RouterLink, SegmentComponent, HeaderDirective, FlexDirective, FillDirective],
    templateUrl: './util-list.component.html',
    styleUrls: ['./util-list.component.scss']
})
export class UtilListExamplesComponent {
    protected readonly prefix = inject(FrameworkService).prefix;

    @HostBinding('class.component-grid')
    public readonly host = true;

    public prevent(event: MouseEvent): void {
        event.stopPropagation();
        event.preventDefault();
    }

}
