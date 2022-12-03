import { Component, HostBinding } from '@angular/core';
import { SegmentComponent } from '../segment/segment.component';

@Component({
    selector: 'm-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends SegmentComponent {

    @HostBinding('class.footer')
    public readonly footer = true;

    public constructor() {
        super();
        this.vertical = true;
    }

}
