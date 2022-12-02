import { Component, HostBinding } from '@angular/core';
import { SegmentComponent } from '../segment/segment.component';
import { DimmableService } from '../../services/dimmable.service';

@Component({
    selector: 'm-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    providers: [DimmableService]
})
export class FooterComponent extends SegmentComponent {

    @HostBinding('class.footer')
    public readonly footer = true;

    public constructor() {
        super();
        this.vertical = true;
    }

}
