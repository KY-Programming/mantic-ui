import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DimmerComponent } from './dimmer.component';

@Component({
    selector: 'm-dimmer-defaults',
    changeDetection: ChangeDetectionStrategy.Eager,
    template: ''
})
export class DimmerDefaultsComponent {

    @Input()
    public set inverted(value: boolean) {
        DimmerComponent.defaults.inverted = value;
        DimmerComponent.defaults.invertedChange.next(value);
    }

}
