import { Component, effect, input, OnDestroy } from '@angular/core';
import { SegmentComponent } from './segment.component';

@Component({
    selector: 'm-segment-defaults',
    template: ''
})
export class SegmentDefaultsComponent implements OnDestroy {
    private readonly previousInverted = SegmentComponent.defaults.inverted();
    private readonly previousRaised = SegmentComponent.defaults.raised();
    private currentInverted?: boolean;
    private currentRaised?: boolean;
    public readonly inverted = input<boolean>();
    public readonly raised = input<boolean>();

    public constructor() {
        effect(() => {
            const value = this.inverted();
            if (value !== undefined) {
                this.currentInverted = value;
                SegmentComponent.defaults.inverted.set(value);
            }
        });
        effect(() => {
            const value = this.raised();
            if (value !== undefined) {
                this.currentRaised = value;
                SegmentComponent.defaults.raised.set(value);
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.currentInverted === SegmentComponent.defaults.inverted()) {
            SegmentComponent.defaults.inverted.set(this.previousInverted);
        }
        if (this.currentRaised === SegmentComponent.defaults.raised()) {
            SegmentComponent.defaults.raised.set(this.previousRaised);
        }
    }
}
