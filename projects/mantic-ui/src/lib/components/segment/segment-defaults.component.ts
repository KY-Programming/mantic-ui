import { Component, Input } from '@angular/core';
import { SegmentComponent } from './segment.component';

@Component({
    selector: 'm-segment-defaults',
    template: '',
    standalone: true
})
export class SegmentDefaultsComponent {
    @Input()
    public set inverted(value: boolean) {
        SegmentComponent.defaults.inverted = value;
        SegmentComponent.defaults.invertedChange.next(value);
    }

    @Input()
    public set raised(value: boolean) {
        SegmentComponent.defaults.raised = value;
        SegmentComponent.defaults.raisedChange.next(value);
    }
}
