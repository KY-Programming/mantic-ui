import { Component } from '@angular/core';
import { SegmentComponent } from '../segment/segment.component';

@Component({
    selector: 'm-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
    hostDirectives: [...SegmentComponent.directives],
    providers: [...SegmentComponent.providers]
})
export class FooterComponent extends SegmentComponent {

    public constructor() {
        super();
        this.classes.registerFixed('footer');
        this.vertical = true;
    }

}
