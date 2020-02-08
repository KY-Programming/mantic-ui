import { Component, Input } from '@angular/core';
import { SegmentComponent } from './segment.component';

@Component({
    selector: 'm-segment-defaults',
    template: ''
})
export class SegmentDefaultsComponent {
    @Input()
    public set raised(value: boolean) {
        SegmentComponent.defaults.raised = value;
    }
}
